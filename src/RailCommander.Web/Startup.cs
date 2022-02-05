using System.Collections.Generic;
using System.Linq;
using Asgard.Communications;
using Asgard.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RailCommander.Core.Locomotives;
using RailCommander.Core.Track;
using RailCommander.Web.Sockets;

namespace RailCommander.Web
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.ConfigureSockets();
            var config = Configuration.GetSection("Asgard");
            services.AddAsgard(config);

            services.AddSingleton<ILayout, Layout>();
            services.AddSingleton<EngineManager>();
            

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
            }

            var extensionProvider = new FileExtensionContentTypeProvider();
            extensionProvider.Mappings.Add(".vue", "application/javascript");
            app.UseStaticFiles(new StaticFileOptions {
                ContentTypeProvider = extensionProvider
            });

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.ConfigureSockets();
        }
    }
}
