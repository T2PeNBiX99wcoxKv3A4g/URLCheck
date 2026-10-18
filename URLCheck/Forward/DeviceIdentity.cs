using Org.BouncyCastle.Crypto.Parameters;
using Serilog;

namespace URLCheck.Forward;

/// <summary>
///     This device's long-term Ed25519 key pair. It is the device's identity: peers pin the public key
///     when they pair, and every handshake is signed with the private key. The private key lives in its
///     own file so it never travels with the settings.
/// </summary>
internal sealed class DeviceIdentity
{
    private const string FileName = "device.key";

    private DeviceIdentity(byte[] privateKey)
    {
        PrivateKey = privateKey;
        PublicKey = new Ed25519PrivateKeyParameters(privateKey, 0).GeneratePublicKey().GetEncoded();
    }

    public byte[] PrivateKey { get; }

    public byte[] PublicKey { get; }

    public string PublicKeyBase64 => ForwardCrypto.ToBase64(PublicKey);

    /// <summary>Reads the key from the config folder, generating one on first use.</summary>
    public static DeviceIdentity LoadOrCreate()
    {
        var directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.Name);
        Directory.CreateDirectory(directory);
        var path = Path.Combine(directory, FileName);

        if (File.Exists(path))
        {
            var key = Read(path);
            if (key is not null)
                return new DeviceIdentity(key);

            Log.Warning("The device key at {Path} is unusable; generating a new one", path);
        }

        var generated = ForwardCrypto.RandomBytes(32);
        try
        {
            File.WriteAllText(path, ForwardCrypto.ToBase64(generated));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to save the device key at {Path}", path);
        }

        return new DeviceIdentity(generated);
    }

    private static byte[]? Read(string path)
    {
        try
        {
            var key = ForwardCrypto.FromBase64(File.ReadAllText(path));
            return key is { Length: 32 } ? key : null;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to read the device key at {Path}", path);
            return null;
        }
    }
}
