using Blog.Data;
using Blog.Models.Feedback;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("Comment")]
    public class CommentController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public CommentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("Send")]
        public async Task<IActionResult> Send(SendCommentViewModel model)
        {
            var comment = new Comment
            {
                Author = model.Author,
                EmailAddress = model.EmailAddress,
                Content = model.Content,
                Time = DateTime.UtcNow,
                ArticleId = model.ArticleId,
                IPAddress = HttpContext.Connection.RemoteIpAddress.ToString()
            };

            _dbContext.Comments.Add(comment);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("GetArticleComments/{articleId}")]
        public IActionResult GetArticleComments([FromRoute] string articleId)
        {
            var comments = _dbContext.Comments
                .Where(c => c.ArticleId == articleId)
                .OrderByDescending(x => x.Time)
                .Select(x => new FetchCommentViewModel
                {
                    EmailAddress = x.EmailAddress,
                    Author = x.Author,
                    Content = x.Content,
                    Time = x.Time
                })
                .ToArray();

            return Ok(comments);
        }
    }
}
