using Microsoft.AspNetCore.WebUtilities;

namespace URLCheck.Scripting;

/// <summary>
///     Reads the custom-scheme links the app registers. Today there is one form:
///     <c>checkurl://script?url=&lt;encoded http(s) url&gt;</c> installs that script.
/// </summary>
internal static class ScriptLink
{
    /// <summary>The script URL the link points at, or null when it is not a script link.</summary>
    public static string? Parse(string link)
    {
        if (!Uri.TryCreate(link, UriKind.Absolute, out var uri) ||
            uri.Scheme is not "checkurl" ||
            !string.Equals(uri.Host, "script", StringComparison.OrdinalIgnoreCase))
            return null;

        if (!QueryHelpers.ParseQuery(uri.Query).TryGetValue("url", out var values))
            return null;

        return Uri.TryCreate(values.ToString(), UriKind.Absolute, out var script) &&
               script.Scheme is "http" or "https"
            ? script.AbsoluteUri
            : null;
    }
}
