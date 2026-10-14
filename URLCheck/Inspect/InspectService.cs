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

    private static readonly Dictionary<string, string> UserAgents = new(StringComparer.OrdinalIgnoreCase)
    {
        ["default"] = "URLCheck Desktop Agent/1.0",
        ["chrome"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        ["safari"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
        ["curl"] = "curl/8.4.0",
        ["bot"] = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    };

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
            return context.Fail("inspect.status.result", "Missing URL.");

        var settings = await _settings.GetAsync();

        try
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var response = await StatusClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, cts.Token);

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
                StatusText = ex is TaskCanceledException ? "Request timed out" : ex.Message,
                Ok = false
            });
        }
    }

    private async Task<NativeResponse?> FollowRedirectAsync(NativeContext context)
    {
        if (context.Payload<InspectRequest>() is not { Url: { Length: > 0 } url })
            return context.Fail("inspect.redirect.result", "Missing URL.");

        var settings = await _settings.GetAsync();

        try
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.TryAddWithoutValidation("User-Agent", ResolveUserAgent(settings.UserAgent));

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

    private static string ResolveUserAgent(string preset) =>
        UserAgents.GetValueOrDefault(preset, UserAgents["default"]);
}
