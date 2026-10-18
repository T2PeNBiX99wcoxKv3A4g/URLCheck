using Org.BouncyCastle.Crypto.Parameters;
using URLCheck.Extensions;
using URLCheck.Utils;

namespace URLCheck.Forward;

/// <summary>
///     This device's long-term Ed25519 key pair. It is the device's identity: peers pin the public key
///     when they pair, and every handshake is signed with the private key. The private key lives in its
///     own file so it never travels with the settings.
/// </summary>
internal sealed class DeviceIdentity : Singleton<DeviceIdentity>
{
    private const string FileName = "device.key";

    /// <summary>Reads the key from the config folder, generating one on first use.</summary>
    public DeviceIdentity()
    {
        var directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.Name);
        Directory.CreateDirectory(directory);
        var path = Path.Combine(directory, FileName);

        var privateKey = File.Exists(path) ? Read(path) : null;
        if (privateKey is null)
        {
            if (File.Exists(path))
                Log.Warning("The device key at {Path} is unusable; generating a new one", path);

            privateKey = ForwardCrypto.RandomBytes(32);
            Try.Run(() => File.WriteAllText(path, ForwardCrypto.ToBase64(privateKey)))
                .OnFailure(ex => Log.Warning(ex, "Failed to save the device key at {Path}", path));
        }

        PrivateKey = privateKey;
        PublicKey = new Ed25519PrivateKeyParameters(privateKey, 0).GeneratePublicKey().GetEncoded();
    }

    public byte[] PrivateKey { get; }

    public byte[] PublicKey { get; }

    public string PublicKeyBase64 => ForwardCrypto.ToBase64(PublicKey);

    private byte[]? Read(string path)
    {
        var key = Try.Run(() => ForwardCrypto.FromBase64(File.ReadAllText(path)))
            .GetOrElse(ex =>
            {
                Log.Warning(ex, "Failed to read the device key at {Path}", path);
                return null;
            });

        return key is { Length: 32 } ? key : null;
    }
}