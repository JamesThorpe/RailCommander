using System.Text.Json.Serialization;

namespace RailCommander.Api.Sockets
{
    public class ConsoleLogSocketMessage : SocketMessage
    {


        [JsonPropertyName("message")]
        public string Message { get; }

        [JsonPropertyName("level")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LogLevel LogLevel { get; }

        public ConsoleLogSocketMessage(LogLevel logLevel, string message) : base("log")
        {
            LogLevel = logLevel;
            Message = message;
        }
    }
}