using System.Net.WebSockets;
using System.Text.Json;

namespace RailCommander.Api.Sockets
{
    public interface ISocketHandler
    {
        Task ProcessMessage(WebSocket socket, JsonDocument jsonDocument);
    }
}