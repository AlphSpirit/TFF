namespace TFF.Engine;

public sealed class Game
{
	public void Start()
	{
		Console.WriteLine("Game started");
		GLFW.Init();
		Console.WriteLine("GLFW initialized");
	}
}