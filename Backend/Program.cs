using Backend.Attributes;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

            builder.Services.AddTransient<RequireFrontEndAccessToken>();
            builder.Services.AddTransient<RequireManagementToken>();

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<PersistentDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddDbContext<MemoryDbContext>(options =>
            {
                options.UseInMemoryDatabase("MemoryDb");
            });

            builder.Services.Configure<JsonSerializerOptions>(options =>
            {
                options.PropertyNameCaseInsensitive = true;
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();

                var logger = app.Services.GetService<ILogger<Program>>();
                logger.LogInformation("Under development environment, auth module disabled.");
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
}