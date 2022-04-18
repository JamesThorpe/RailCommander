using System.Text.Json.Serialization;

namespace RailCommander.Api.Sockets
{
    public abstract class SocketMessage
    {
        [JsonPropertyName("type")]
        public string Type { get; }

        protected SocketMessage(string type)
        {
            Type = type;
        }
    }
}