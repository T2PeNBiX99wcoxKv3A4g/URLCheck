using System.Reflection;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace URLCheck.Services;

/// <summary>
///     The local Kestrel instance that serves the built interface to the web views.
///     It binds to port 0, so the OS hands out a port that is really free instead of every Photino
///     app racing for 8000 — which is what <c>Photino.NET.Server</c> does, with a scan that can miss
///     an occupied port and then fail to bind.
/// </summary>
internal sealed class StaticServer : IDisposable
{
    private readonly WebApplication _application;

    private StaticServer(WebApplication application, Uri address)
    {
        _application = application;
        Address = address;
    }

    /// <summary>The address Kestrel actually bound, e.g. <c>http://127.0.0.1:54321</c>.</summary>
    [PublicAPI]
    public Uri Address { get; }

    /// <summary>The page the web views load, versioned so an upgrade never reuses the old bundle.</summary>
    public string AppUrl => $"{Address.GetLeftPart(UriPartial.Authority)}/index.html?v={AppInfoService.BuildToken}";

    public void Dispose() => _application.DisposeAsync().AsTask().GetAwaiter().GetResult();

    /// <summary>
    ///     Starts the server and waits until Kestrel reports a real port. The content root is a
    ///     folder we own, so the server cannot drop a <c>wwwroot</c> next to the executable.
    /// </summary>
    public static StaticServer Start(string contentRoot)
    {
        var webRoot = Path.Combine(contentRoot, "wwwroot");
        Directory.CreateDirectory(webRoot);

        var builder = WebApplication.CreateBuilder(new WebApplicationOptions
        {
            ContentRootPath = contentRoot,
            WebRootPath = webRoot
        });

        // Serilog owns the console; Kestrel's own startup chatter would only duplicate it.
        builder.Logging.ClearProviders();

        // Port 0 asks the OS for a free port. The real one is read back after StartAsync below.
        builder.WebHost.UseUrls("http://127.0.0.1:0");

        // Files on disk win, so a build can be overridden without touching the embedded copy.
        builder.Environment.WebRootFileProvider = new CompositeFileProvider(
            builder.Environment.WebRootFileProvider,
            new ManifestEmbeddedFileProvider(Assembly.GetEntryAssembly()!, "Resources/wwwroot"));

        var application = builder.Build();
        application.UseDefaultFiles();
        application.UseStaticFiles(new StaticFileOptions
        {
            DefaultContentType = "text/plain"
        });

        application.StartAsync().GetAwaiter().GetResult();

        var address = application.Services.GetRequiredService<IServer>()
            .Features.Get<IServerAddressesFeature>()?
            .Addresses.FirstOrDefault();

        if (address is null || !Uri.TryCreate(address, UriKind.Absolute, out var uri))
            throw new InvalidOperationException("Kestrel did not report the address it bound.");

        return new(application, uri);
    }
}