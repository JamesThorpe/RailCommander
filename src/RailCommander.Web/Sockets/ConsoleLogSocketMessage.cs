using System.Text.Json.Serialization;

namespace RailCommander.Web.Sockets
{
    public class ConsoleLogSocketMessage : SocketMessage
    {
        [JsonPropertyName("message")]
        public string Message { get; }

        public ConsoleLogSocketMessage(string message):base("log")
        {
            Message = message;
        }
    }
}