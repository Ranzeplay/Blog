using Backend.Attributes;
using Backend.Data;
using Backend.Models.Article;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Linq;
using System.Text.Json;

namespace Backend.Controllers
{
    [Route("/api/article")]
    public class ArticleController(ArticleService articleService, BackendDbContext dbContext) : Controller
    {
        private readonly ArticleService _articleService = articleService;
        private readonly BackendDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var articles = _dbContext.Articles
                .Select(a => new ArticleViewModel(a))
                .Include(a => a.Category)
                .Include(a => a.Tags);

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

        [HttpGet("asset/{articleId}/{name}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
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
