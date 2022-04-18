using System.Collections.Concurrent;

namespace RailCommander.Api.Sockets
{
    public class SocketLogger : ILogger
    {
        private SocketManager _socketManager;

        public SocketLogger(SocketManager socketManager)
        {
            _socketManager = socketManager;
        }
        public IDisposable BeginScope<TState>(TState state) => default;

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _socketManager?.SendToAll(new ConsoleLogSocketMessage(logLevel, formatter(state, exception)));

            //console supports debug, info, warn, error
        }
    }

    public class SocketLoggerProvider : ILoggerProvider
    {
        private readonly SocketManager _socketManager;


        public SocketLoggerProvider(SocketManager services)
        {
            _socketManager = services;
        }
        private readonly ConcurrentDictionary<string, SocketLogger> _loggers = new ConcurrentDictionary<string, SocketLogger>();
        public void Dispose()
        {
            _loggers.Clear();
        }

        public ILogger CreateLogger(string categoryName)
        {
            return _loggers.GetOrAdd(categoryName, n => new SocketLogger(_socketManager));
        }
    }
}
