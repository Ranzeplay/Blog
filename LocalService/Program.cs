using LocalService.Attributes;
using LocalService.Models;
using LocalService.Services;

namespace LocalService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateSlimBuilder(args);

            builder.Services.AddScoped<ArticleService>();
            builder.Services.AddScoped<MarkdownService>();
            builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

            builder.Services.AddTransient<RequireAccessToken>();

            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
}