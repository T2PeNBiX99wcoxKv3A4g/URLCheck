using System.Security.Cryptography;

namespace URLCheck.Forward;

/// <summary>
///     Encrypts forwarded URLs with a key derived from the shared pairing code, so the traffic on the
///     local network is unreadable without that code. AES-GCM also authenticates the frame, which is
///     what turns the pairing code into an access check as well as a key.
/// </summary>
internal static class ForwardCrypto
{
    private const int KeySize = 32;
    private const int NonceSize = 12;
    private const int TagSize = 16;
    private const int Iterations = 100_000;

    /// <summary>
    ///     A fixed salt is deliberate: both ends must derive the same key from the same code, and the
    ///     pairing code — not the salt — is the secret.
    /// </summary>
    private static readonly byte[] Salt = "URLCheck.Forward.v1"u8.ToArray();

    public static byte[] DeriveKey(string pairingCode) =>
        Rfc2898DeriveBytes.Pbkdf2(pairingCode, Salt, Iterations, HashAlgorithmName.SHA256, KeySize);

    /// <summary>Returns <c>nonce || ciphertext || tag</c>.</summary>
    public static byte[] Encrypt(byte[] key, ReadOnlySpan<byte> plaintext)
    {
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var output = new byte[NonceSize + plaintext.Length + TagSize];

        using var aes = new AesGcm(key, TagSize);
        aes.Encrypt(nonce, plaintext, output.AsSpan(NonceSize, plaintext.Length),
            output.AsSpan(NonceSize + plaintext.Length));

        nonce.CopyTo(output, 0);
        return output;
    }

    /// <summary>Decrypts a frame, or returns <c>null</c> when it was tampered with or the key is wrong.</summary>
    public static byte[]? TryDecrypt(byte[] key, ReadOnlySpan<byte> frame)
    {
        if (frame.Length < NonceSize + TagSize)
            return null;

        var plaintext = new byte[frame.Length - NonceSize - TagSize];
        try
        {
            using var aes = new AesGcm(key, TagSize);
            aes.Decrypt(frame[..NonceSize], frame[NonceSize..^TagSize], frame[^TagSize..], plaintext);
            return plaintext;
        }
        catch (CryptographicException)
        {
            return null;
        }
    }
}
