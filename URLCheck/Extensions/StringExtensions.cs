using JetBrains.Annotations;

namespace URLCheck.Extensions;

/// <summary>Small string helpers used when logging raw protocol traffic.</summary>
[PublicAPI]
public static class StringExtensions
{
    /// <summary>Removes control characters, keeping the ones listed in <paramref name="exclude" />.</summary>
    public static string RemoveControlChars(this string value, params char[] exclude) =>
        string.Concat(value.Where(character => !char.IsControl(character) || exclude.Contains(character)));

    /// <summary>Returns the value shortened to at most <paramref name="maximumLength" /> characters.</summary>
    public static string? Truncate(this string? value, int maximumLength) =>
        value is null || value.Length <= maximumLength ? value : value[..maximumLength];
}