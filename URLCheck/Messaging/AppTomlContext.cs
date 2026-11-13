using System.Text.Json.Serialization;
using Tomlyn.Serialization;
using URLCheck.Models;

namespace URLCheck.Messaging;

/// <summary>The settings file's TOML serializer, generated so a trimmed build keeps every property.</summary>
[TomlSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    WriteIndented = true,
    IndentSize = 2)]
[TomlSerializable(typeof(AppSettings))]
[TomlSerializable(typeof(UserAgentEntry))]
[TomlSerializable(typeof(BrowserEntry))]
[TomlSerializable(typeof(DeviceEntry))]
internal partial class AppTomlContext : TomlSerializerContext;
