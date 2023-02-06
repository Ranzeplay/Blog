using Blog.Managers;
using Blog.Models;
using Blog.Models.API;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class ArticleController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly string _articleDirectory;
        private readonly ArticleManager _articleManager;

        public ArticleController(IOptions<AppSettings> options, ArticleManager articleManager)
        {
            _appSettings = options.Value;
            _articleDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "Articles");
            _articleManager = articleManager;
        }

        [HttpGet]
        public IActionResult Read([FromRoute] string id)
        {
            var targetArticleDirectory = Path.Combine(_articleDirectory, id);
            if (!Directory.Exists(targetArticleDirectory))
            {
                return NotFound("Article doesn't exist");
            }

            var articleFilePath = Path.Combine(targetArticleDirectory, "text.md");
            if (!System.IO.File.Exists(articleFilePath))
            {
                return NotFound("Article not found, please contact website operator.");
            }

            var text = System.IO.File.ReadAllText(articleFilePath);

            var model = MarkdownManager.ParseOriginalMarkdown(text);

            return Json(model);
        }
    }
}
