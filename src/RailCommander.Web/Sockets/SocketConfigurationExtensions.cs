using System;
using System.Collections.Concurrent;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace RailCommander.Web
{

    public delegate ISocketHandler SocketHandlerFactory(string handlerType);

    public static class SocketConfigurationExtensions
    {

        public static IApplicationBuilder ConfigureSockets(this IApplicationBuilder app)
        {
            app.UseWebSockets(new WebSocketOptions {
                KeepAliveInterval = TimeSpan.FromSeconds(30),
                ReceiveBufferSize = SocketManager.BufferSize
            });

            return app.Use(async (context, next) => {
                if (context.Request.Path == "/ws") {
                    if (context.WebSockets.IsWebSocketRequest) {
                        using var ws = await context.WebSockets.AcceptWebSocketAsync();
                        var sm = context.RequestServices.GetService<SocketManager>();
                        
                        await sm.HandleSocket(ws);
                        
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