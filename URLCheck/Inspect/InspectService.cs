using URLCheck.Extensions;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Services;
using URLCheck.Utils;

namespace URLCheck.Inspect;

/// <summary>Answers the <c>inspect.*</c> messages: the HTTP status of a URL, redirects included.</summary>
internal sealed class InspectService : Singleton<InspectService>
{
    /// <summary>
    ///     Never follows redirects, so the response keeps its own status: a redirect comes back as the
    ///     exact 3xx it is (301, 302, 303, 307, 308, ...) together with its Location. The popup then
    ///     reports that code and jumps to the target.
    /// </summary>
    private static readonly HttpClient Client = new(new SocketsHttpHandler
    {
        AllowAutoRedirect = false
    });

    /// <summary>How many hops a short link is followed through before giving up.</summary>
    private const int MaxRedirects = 10;

    private readonly SettingsService _settings = SettingsService.Instance;

    public InspectService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "inspect.status" => CheckStatusAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> CheckStatusAsync(NativeContext context)
    {
        if (context.Payload<InspectRequest>() is not { Url: { Length: > 0 } url } payload)
            return context.Fail("inspect.status.result", "error.missingUrl");

        var settings = await _settings.GetAsync();

        var result = await Try.Run(async () =>
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.TryAddWithoutValidation("User-Agent", ResolveUserAgent(settings, payload.UserAgentId));

            using var response = await Client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cts.Token);

            return new InspectStatusPayload((int)response.StatusCode, response.ReasonPhrase ?? string.Empty,
                response.IsSuccessStatusCode, response.Headers.Location?.ToString());
        });

        // A failed request (DNS, TLS, timeout, ...) is reported as a non-OK status.
        return context.Reply("inspect.status.result", result.GetOrElse(ex =>
            new(0, ex is TaskCanceledException ? "error.timeout" : ex.Message, false, null)));
    }

    /// <summary>
    ///     Follows a URL's redirect chain and returns where it finally lands. A non-http(s) target, a
    ///     failed request or the hop limit just stops it, so the caller always gets something usable.
    /// </summary>
    public async Task<string> ResolveRedirectsAsync(string url)
    {
        var settings = await _settings.GetAsync();
        var userAgent = ResolveUserAgent(settings, null);
        var current = url;

        for (var hop = 0; hop < MaxRedirects; hop++)
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            using var request = new HttpRequestMessage(HttpMethod.Get, current);
            request.Headers.TryAddWithoutValidation("User-Agent", userAgent);

            using var response = await Client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cts.Token);

            if (response.Headers.Location is not { } location)
                return current;

            var next = new Uri(new Uri(current), location);
            if (next.Scheme is not ("http" or "https"))
                return current;

            current = next.ToString();
        }

        return current;
    }

    /// <summary>
    ///     Picks the header for an outbound request: the entry the popup asked for, otherwise the
    ///     configured default, otherwise the first entry.
    /// </summary>
    private static string ResolveUserAgent(AppSettings settings, string? requestedId)
    {
        var entry = settings.UserAgents.FirstOrDefault(agent => agent.Id == requestedId)
                    ?? settings.UserAgents.FirstOrDefault(agent => agent.Id == settings.SelectedUserAgentId)
                    ?? settings.UserAgents.FirstOrDefault();

        return entry?.Value is { Length: > 0 } value ? value : "URLCheck Desktop Agent/1.0";
    }
}