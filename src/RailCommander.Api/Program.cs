using Asgard.Extensions;
using Microsoft.Extensions.FileProviders;
using RailCommander.Api.Sockets;
using RailCommander.Core.Locomotives;
using RailCommander.Core.Track;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureSockets();


var config = builder.Configuration.GetSection("Asgard");
builder.Services.AddAsgard(config);

builder.Services.AddSingleton<ILayout, Layout>();
builder.Services.AddSingleton<EngineManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} else {
    app.UseStaticFiles(new StaticFileOptions { FileProvider = new PhysicalFileProvider(Path.GetFullPath("../railcommander.ui/dist")) });
}

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();
app.ConfigureSockets();
app.Run();
