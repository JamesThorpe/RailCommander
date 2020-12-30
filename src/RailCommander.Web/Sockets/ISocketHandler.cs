using System.Net.WebSockets;
using System.Text.Json;
using System.Threading.Tasks;

namespace RailCommander.Web
{
    public interface ISocketHandler
    {
        Task ProcessMessage(WebSocket socket, JsonDocument jsonDocument);
    }
}