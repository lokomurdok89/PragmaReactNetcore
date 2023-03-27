using API.Extension;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Serilog;


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
app.ConfigureExceptionHandler();


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
