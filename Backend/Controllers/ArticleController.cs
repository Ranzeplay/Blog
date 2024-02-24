using Backend.Attributes;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ServiceFilter(typeof(RequireAccessToken))]
    [Route("/api/article")]
    public class ArticleController(ArticleService articleService) : Controller
    {
        private readonly ArticleService _articleService = articleService;

        [HttpGet("index")]
        public IActionResult Index()
        {
            _articleService.RefreshCacheAsync().Wait();

            var articles = _articleService.GetArticles();
            articles = articles.OrderByDescending(a => a.PublishTime);

            return new JsonResult(articles ?? []);
        }

        [HttpGet("entry/{articleId}")]
        public IActionResult GetEntry(string articleId)
        {
            var article = _articleService.GetArticle(articleId);
            if (article != null)
            {
                return new JsonResult(article);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("asset/{articleId}/{name}")]
        public IActionResult Asset(string articleId, string name)
        {
            var asset = _articleService.GetAsset(articleId, name);
            if (asset == null)
            {
                return NotFound();
            }
            else
            {
                return File(asset.Content, asset.ContentType);
            }
        }
    }
}
