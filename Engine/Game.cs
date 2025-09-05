namespace TFF.Engine;

public sealed class Game
{
    private IntPtr window;

    public void Start()
    {
        GLFW.Init();
        if (GLFW.PlatformSupported(GLFW.GLFW_PLATFORM_WAYLAND))
        {
            GLFW.InitHint(GLFW.GLFW_PLATFORM, GLFW.GLFW_PLATFORM_WAYLAND);
        }
        window = GLFW.CreateWindow(800, 600, "TFF");
        GLFW.MakeContextCurrent(window);
        while (GLFW.WindowShouldClose(window))
        {
            GLFW.SwapBuffers(window);
            GLFW.PollEvents();
        }
        GLFW.Terminate();
    }
}
