using System;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using RailCommander.Web.Sockets;

namespace RailCommander.Web
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
                await _manager.SendMessage(c, new ConsoleLogSocketMessage(msg));
            }
        }
    }
}