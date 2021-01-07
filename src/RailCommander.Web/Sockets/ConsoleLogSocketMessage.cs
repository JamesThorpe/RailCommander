using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

namespace RailCommander.Web.Sockets
{
    public class ConsoleLogSocketMessage : SocketMessage
    {
        

        [JsonPropertyName("message")]
        public string Message { get; }

        [JsonPropertyName("level")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LogLevel LogLevel { get; }

        public ConsoleLogSocketMessage(LogLevel logLevel, string message):base("log")
        {
            LogLevel = logLevel;
            Message = message;
        }
    }
}