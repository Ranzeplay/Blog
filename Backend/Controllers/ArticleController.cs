using Backend.Attributes;
using Backend.Data;
using Backend.Models.Article;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("/api/article")]
    public class ArticleController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public async Task<IActionResult> IndexAsync()
        {
            var articles = _dbContext.Articles
                .Include(a => a.Category)
                .Include(a => a.Tags)
                .Select(a => new ArticleViewModel(a));

            await articles.ForEachAsync(a => a.Content = a.Content.Length > 50 ? a.Content[..50] : a.Content);

            return Ok(articles);
        }

        [HttpGet("entry/{slug}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string slug)
        {
            var article = _dbContext.Articles
                .Where(a => a.Slug == slug)
                .Include(a => a.Category)
                .Include(a => a.Tags)
                .FirstOrDefault();

            if (article == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new ArticleViewModel(article));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreateArticleViewModel model)
        {
            var tags = _dbContext.Tags
                .Where(t => model.TagSlugs.Any(u => u == t.Slug))
                .ToList();

            var article = new DbArticle
            {
                Slug = model.Slug,
                Title = model.Title,
                PublishTime = DateTime.UtcNow,
                LastModifiedTime = DateTime.UtcNow,
                Tags = tags,
                Category = _dbContext.Categories.First(t => model.CategorySlug == t.Slug),
                Content = model.Content
            };

            var result = await _dbContext.Articles.AddAsync(article);
            await _dbContext.SaveChangesAsync();

            return Created($"entry/{result.Entity.Slug}", null);
        }
    }
}
