using Blog.Managers;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    [Route("Article")]
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

        [HttpGet("Read/{id}")]
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

            var model = MarkdownManager.ParseOriginalArticleMarkdown(text);

            return Json(model);
        }

        [HttpGet("List/{query}")]
        [HttpGet("List")]
        public IActionResult List(string? query) 
        {
            var articles = _articleManager.GetArticleMetadata();
            return Json(articles);
        }

        [HttpGet("Asset/{id}/{path}")]
        public IActionResult Asset([FromRoute] string id, [FromRoute] string path)
        {
            var asset = _articleManager.GetAsset(id, path);
            if (asset != null)
            {
                return File(asset.Content, asset.ContentType);
            }

            return NotFound("Coudn't acquire the requested asset!");
        }
    }
}
