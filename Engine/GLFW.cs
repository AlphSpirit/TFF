using System.Runtime.InteropServices;

namespace TFF.Engine;

public static unsafe partial class GLFW
{
    public const int GLFW_PLATFORM = 327683;
    public const int GLFW_PLATFORM_WAYLAND = 393219;
    public const int GLFW_PLATFORM_X11 = 393220;

    [LibraryImport("libglfw.so.3.5")]
    private static partial int glfwInit();
    public static void Init()
    {
        if (glfwInit() == 0)
            throw new Exception("Failed to initialize GLFW");
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial void glfwTerminate();
    public static void Terminate()
    {
        glfwTerminate();
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial int glfwPlatformSupported(int platform);
    public static bool PlatformSupported(int platform)
    {
        return glfwPlatformSupported(platform) != 0;
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial void glfwInitHint(int hint, int value);
    public static void InitHint(int hint, int value)
    {
        glfwInitHint(hint, value);
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial IntPtr glfwCreateWindow(int width, int height, char* title, IntPtr monitor, IntPtr share);
    public static IntPtr CreateWindow(int width, int height, string title)
    {
        char* pTitle = (char*)Marshal.StringToHGlobalAnsi(title);
        IntPtr window = glfwCreateWindow(width, height, pTitle, IntPtr.Zero, IntPtr.Zero);
        Marshal.FreeHGlobal((IntPtr)pTitle);
        if (window == IntPtr.Zero)
            throw new Exception("Failed to create GLFW window");
        return window;
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial void glfwMakeContextCurrent(IntPtr window);
    public static void MakeContextCurrent(IntPtr window)
    {
        glfwMakeContextCurrent(window);
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial int glfwWindowShouldClose(IntPtr window);
    public static bool WindowShouldClose(IntPtr window)
    {
        return glfwWindowShouldClose(window) == 0;
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial void glfwSwapBuffers(IntPtr window);
    public static void SwapBuffers(IntPtr window)
    {
        glfwSwapBuffers(window);
    }

    [LibraryImport("libglfw.so.3.5")]
    private static partial void glfwPollEvents();
    public static void PollEvents()
    {
        glfwPollEvents();
    }
}
