using Photino.NET;

namespace URLCheck.Platform;

/// <summary>Window operations that differ per platform (hide/show/always-on-top/drag).</summary>
internal interface IWindowPlatform
{
    void Hide(PhotinoWindow window);

    void Show(PhotinoWindow window);

    void KeepOnTop(PhotinoWindow window);

    void StartDrag(PhotinoWindow window);

    void Resize(PhotinoWindow window, int width, int height, bool center);
}
