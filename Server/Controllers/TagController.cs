using Blog.Managers;
using Blog.Models;
using Blog.Models.Tag;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class TagController : Controller
    {
        private readonly ArticleManager _articleManager;

        public TagController(ArticleManager articleManager)
        {
            _articleManager = articleManager;
        }

        [HttpGet]
        public IActionResult List(string? query)
        {
            var tags = _articleManager.GetTagsWithCount();

            return Json(tags);
        }

        [HttpGet]
        public IActionResult Detail([FromRoute] string id)
        {
            var articles = _articleManager.FindByTag(id);
            if (!articles.Any())
            {
                return NotFound("No such category");
            }

            return Json(new TagDetailViewModel
            {
                Articles = articles,
                Name = id
            });
        }
    }
}
