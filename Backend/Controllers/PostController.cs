using Backend.Attributes;
using Backend.Data;
using Backend.Models.Post;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("/api/post")]
    public class PostController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var posts = _dbContext.Posts
                .Select(p => new PostViewModel(p));

            return Ok(posts);
        }

        [HttpGet("entry/{slug}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string slug)
        {
            var post = _dbContext.Posts
                .Where(p => p.Slug == slug)
                .Include(p => p.Tags)
                .FirstOrDefault();
            if (post == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new PostViewModel(post));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreatePostViewModel model)
        {
            var tags = _dbContext.Tags
                .Where(t => model.TagSlugs.Any(u => u == t.Slug))
                .ToList();

            var post = new DbPost
            {
                Slug = model.Slug,
                Title = model.Title,
                PublishTime = DateTime.UtcNow,
                LastModifiedTime = DateTime.UtcNow,
                Tags = tags,
                Content = model.Content
            };

            var result = await _dbContext.Posts.AddAsync(post);
            await _dbContext.SaveChangesAsync();

            return Created($"entry/{result.Entity.Slug}", null);
        }
    }
}
