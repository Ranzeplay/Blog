using Backend.Attributes;
using Backend.Data;
using Backend.Models.Article;
using Backend.Models.Tag;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("/api/tag")]
    public class TagController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var tags = _dbContext.Tags
                .Include(t => t.Posts)
                .Include(t => t.Articles)
                .Select(t => new TagViewModel(t))
                .ToList();
            return Ok(tags);
        }

        [HttpGet("entry/{slug}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string slug)
        {
            var tag = _dbContext.Tags
                .FirstOrDefault(t => t.Slug == slug);

            if (tag == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new TagViewModel(tag));
            }
        }

        [HttpGet("entry/{slug}/articles")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public async Task<IActionResult> GetArticlesAsync(string slug)
        {
            var tag = _dbContext.Tags.FirstOrDefault(t => t.Slug == slug);

            if (tag == null)
            {
                return NotFound();
            }
            else
            {
                var articles = _dbContext.Articles.Where(a => a.Tags.Any(t => t.Slug == slug));
                await articles.ForEachAsync(a => a.Content = string.Empty);
                return Ok(articles.Select(a => new ArticleViewModel(a)));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreateTagViewModel model)
        {
            var tag = new DbTag
            {
                Name = model.Name,
                Slug = model.Slug,
            };

            await _dbContext.Tags.AddAsync(tag);
            await _dbContext.SaveChangesAsync();
            return Created($"entry/{tag.Slug}", null);
        }
    }
}