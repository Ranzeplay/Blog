using Backend.Services;
using LocalService.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class OverviewController(ArticleService articleService) : Controller
    {
        private readonly ArticleService _articleService = articleService;

        [HttpGet]
        [Route("/api/overview")]
        public IActionResult Overview()
        {
            var articles = _articleService.GetArticles();

            var categories = articles.Select(x => x.Category).Distinct();

            var tagArray = articles.Select(x => x.Tags);
            var tagWithDuplication = new List<string>();
            foreach (var tagArrayEntry in tagArray)
            {
                tagWithDuplication.AddRange(tagArrayEntry);
            }
            var tags = tagWithDuplication.Distinct();

            return Ok(new BlogOverview(articles.LongCount(), tags.LongCount(), categories.LongCount()));
        }
    }
}
