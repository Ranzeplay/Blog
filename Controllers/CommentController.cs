using Blog.Data;
using Blog.Models.Feedback;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    public class CommentController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public CommentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Send(SendCommentViewModel model)
        {
            var comment = new Comment
            {
                Author = model.Author,
                EmailAddress = model.EmailAddress,
                Content = model.Content,
                Time = DateTime.UtcNow,
                IPAddress = HttpContext.Connection.RemoteIpAddress.ToString()
            };

            _dbContext.Comments.Add(comment);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
