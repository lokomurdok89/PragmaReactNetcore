using System.Net;
using API.Extension;
using API.Utils;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Serilog;
using Newtonsoft.Json;
using Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var logger = new LoggerConfiguration()
					.ReadFrom.Configuration(builder.Configuration)
					.Enrich.FromLogContext()
					.CreateLogger();

//builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//add policy cors
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();
 app.Use((context, next) =>
            {
                context.Request.EnableBuffering();
                return next();
            });
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<RequestResponseLoggingMiddleware>();
app.UseExceptionHandler(appError => {
                appError.Run(async conext =>
                {
                    conext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    conext.Response.ContentType = "application/json";

                    var contextFeature = conext.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature!=null) {

                       // error.Message "Hola ";
                        await conext.Response.WriteAsync(JsonConvert.SerializeObject(new ErrorDetails (conext.Response.StatusCode)));
                    }
                });
            });

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    
    var logs = services.GetRequiredService<ILogger<Program>>();
    logs.LogError(ex,"Error al cargar la base de datos");
}

app.Run();
