using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Services;

namespace URLCheck.Inspect;

/// <summary>Answers the <c>inspect.*</c> messages: HTTP status checks and redirect lookups.</summary>
internal sealed class InspectService
{
    /// <summary>Follows redirects, so a status check reports the final destination's status.</summary>
    private static readonly HttpClient StatusClient = new(new SocketsHttpHandler { AllowAutoRedirect = true });

    /// <summary>Does not follow redirects, so the first hop's Location can be read.</summary>
    private static readonly HttpClient RedirectClient = new(new SocketsHttpHandler { AllowAutoRedirect = false });

    private readonly SettingsService _settings;

    public InspectService(SettingsService settings)
    {
        _settings = settings;
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "inspect.status" => CheckStatusAsync(context),
        "inspect.redirect" => FollowRedirectAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> CheckStatusAsync(NativeContext context)
    {
        if (context.Payload<InspectRequest>() is not { Url: { Length: > 0 } url })
            return context.Fail("inspect.status.result", "error.missingUrl");

        var settings = await _settings.GetAsync();

        try
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.TryAddWithoutValidation("User-Agent", ResolveUserAgent(settings));

            using var response = await StatusClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cts.Token);

            return context.Reply("inspect.status.result", new
            {
                StatusCode = (int)response.StatusCode,
                StatusText = response.ReasonPhrase ?? string.Empty,
                Ok = response.IsSuccessStatusCode
            });
        }
        catch (Exception ex)
        {
            // A failed request (DNS, TLS, timeout, ...) is reported as a non-OK status.
            return context.Reply("inspect.status.result", new
            {
                StatusCode = 0,
                StatusText = ex is TaskCanceledException ? "error.timeout" : ex.Message,
                Ok = false
            });
        }
    }

    private async Task<NativeResponse?> FollowRedirectAsync(NativeContext context)
    {
        if (context.Payload<InspectRequest>() is not { Url: { Length: > 0 } url })
            return context.Fail("inspect.redirect.result", "error.missingUrl");

        var settings = await _settings.GetAsync();

        try
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.TryAddWithoutValidation("User-Agent", ResolveUserAgent(settings));

            using var response = await RedirectClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cts.Token);

            return context.Reply("inspect.redirect.result", new
            {
                Location = response.Headers.Location?.ToString()
            });
        }
        catch (Exception ex)
        {
            return context.Fail("inspect.redirect.result", ex.Message);
        }
    }

    private static string ResolveUserAgent(AppSettings settings) =>
        settings.UserAgents.FirstOrDefault()?.Value is { Length: > 0 } value
            ? value
            : "URLCheck Desktop Agent/1.0";
}
