using System.Text.Json.Serialization;

namespace RailCommander.Web.Sockets
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