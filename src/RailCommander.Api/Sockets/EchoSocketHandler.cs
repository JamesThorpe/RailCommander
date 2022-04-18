using System.Net.WebSockets;
using System.Text.Json;

namespace RailCommander.Api.Sockets
{
    public class EchoSocketHandler : ISocketHandler
    {
        private readonly SocketManager _manager;

        public EchoSocketHandler(SocketManager manager)
        {
            _manager = manager;
        }


        public async Task ProcessMessage(WebSocket socket, JsonDocument jsonDocument)
        {
            var msg = jsonDocument.RootElement.GetProperty("message").GetString();
            foreach (var c in _manager.Clients.Where(c => c != socket)) {
                await _manager.SendMessage(c, new ConsoleLogSocketMessage(LogLevel.Information, msg));
            }
        }
    }
}