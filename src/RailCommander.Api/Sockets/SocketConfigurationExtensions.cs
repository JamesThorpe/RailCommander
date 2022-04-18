namespace RailCommander.Api.Sockets
{

    public delegate ISocketHandler SocketHandlerFactory(string handlerType);

    public static class SocketConfigurationExtensions
    {

        public static IApplicationBuilder ConfigureSockets(this IApplicationBuilder app)
        {
            app.UseWebSockets(new WebSocketOptions {
                KeepAliveInterval = TimeSpan.FromSeconds(30)
            });

            return app.Use(async (context, next) => {
                if (context.Request.Path == "/socket") {
                    if (context.WebSockets.IsWebSocketRequest) {
                        var sm = context.RequestServices.GetService<SocketManager>();

                        await sm.HandleSocket(context);

                    } else {
                        context.Response.StatusCode = 400;
                    }
                } else {
                    await next();
                }
            });
        }

        public static IServiceCollection ConfigureSockets(this IServiceCollection services)
        {

            services.AddSingleton<SocketManager>();

            services.AddTransient<EchoSocketHandler>();
            services.AddTransient<SocketHandlerFactory>(provider => handlerType => {
                //TODO: maybe use attribute to look this up rather than it being hardcoded here
                return handlerType switch {
                    "echo" => provider.GetService<EchoSocketHandler>(),
                    _ => null
                };
            });


            return services;
        }
    }
}