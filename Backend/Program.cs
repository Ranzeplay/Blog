using Backend.Attributes;
using Backend.Models;
using Backend.Services;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateSlimBuilder(args);

            builder.Services.AddSingleton<ArticleService>();
            builder.Services.AddSingleton<MarkdownService>();
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