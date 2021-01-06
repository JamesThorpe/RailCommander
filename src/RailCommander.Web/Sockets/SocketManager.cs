using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RailCommander.Web.Sockets;

namespace RailCommander.Web
{
    public class SocketManager
    {
        private readonly SocketHandlerFactory _handlerFactory;
        private readonly ILogger _logger;
        public const int BufferSize = 4096;

        private readonly List<WebSocket> _sockets;
        private readonly object _socketLock = new object();


        public IEnumerable<WebSocket> Clients {
            get {
                IEnumerable<WebSocket> ret;
                lock (_socketLock) {
                    //Take a copy of the list so caller can safely enumerate it without fear of it changing
                    ret = _sockets?.ToList();
                }
                return ret;
            }
        }

        public SocketManager(SocketHandlerFactory handlerFactory, ILogger<SocketManager> logger)
        {
            _handlerFactory = handlerFactory;
            _logger = logger;
            _sockets = new List<WebSocket>();
        }

        public async Task HandleSocket(HttpContext context)
        {
            using var ws = await context.WebSockets.AcceptWebSocketAsync();

            lock (_socketLock) {
                _sockets.Add(ws);
            }

            _logger.LogInformation("WebSocket client connected from {0}:{1}", context.Connection.RemoteIpAddress, context.Connection.RemotePort);

            var buffer = new byte[BufferSize];
            var msg = new StringBuilder();
            var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            while (!result.CloseStatus.HasValue) {
                msg.Append(Encoding.UTF8.GetString(buffer, 0, result.Count));
                if (result.EndOfMessage) {
                    //TODO: error handling

                    //TODO: deserialiser/parser supports utf8 byte string input - ie no need for string builder
                    var m = JsonDocument.Parse(msg.ToString());
                    if (m.RootElement.TryGetProperty("type", out var type)) {
                        var handler = _handlerFactory(type.GetString());
                        await handler.ProcessMessage(ws, m);
                    }

                    //TODO: add version?
                    await SendMessage(ws, new ConsoleLogSocketMessage("Connected to RailCommander"));

                    msg.Clear();
                }
                result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            await ws.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

            lock (_socketLock) {
                _sockets.Remove(ws);
            }
        }

        public async Task SendMessage(WebSocket socket, SocketMessage message)
        {
            var b = JsonSerializer.SerializeToUtf8Bytes<object>(message);
            await socket.SendAsync(new ArraySegment<byte>(b), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}