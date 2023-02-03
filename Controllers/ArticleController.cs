using Blog.Managers;
using Blog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class ArticleController : Controller
    {
        private readonly AppSettings _appSettings;

        public ArticleController(IOptions<AppSettings> options)
        {
            _appSettings = options.Value;
        }

        public IActionResult Read([FromRoute]string id)
        {
            var articleDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "Articles", id);
            if(!Directory.Exists(articleDirectory))
            {
                return NotFound("Article not found.");
            }

            var articleFilePath = Path.Combine(articleDirectory, "text.md");
            if (!System.IO.File.Exists(articleFilePath))
            {
                return NotFound("Article file not found, please contact website operator.");
            }

            var text = System.IO.File.ReadAllText(articleFilePath);

            var article = MarkdownManager.ParseArticleFile(text);

            return View(article);
        }

        public IActionResult List(string? query)
        {
            return View();
        }
    }
}
