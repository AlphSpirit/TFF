using System.Runtime.InteropServices;

namespace TFF.Engine;

public static unsafe partial class GLFW
{
	[LibraryImport("libglfw.so.3.5")]
	private static partial int glfwInit();
	public static void Init()
	{
		if (glfwInit() == 0)
			throw new Exception("Failed to initialize GLFW");
	}
}