using Blog.Managers;
using Blog.Models;
using Blog.Models.Category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ArticleManager _articleManager;

        public CategoryController(ArticleManager articleManager)
        {
            _articleManager = articleManager;
        }

        [HttpGet]
        public IActionResult List(string? query)
        {
            var categories = _articleManager.GetCategoriesWithCount();

            return Json(categories);
        }

        [HttpGet]
        public IActionResult Detail([FromRoute] string id)
        {
            var articles = _articleManager.FindByCategory(id);
            if (!articles.Any())
            {
                return NotFound("No such category");
            }

            return Json(new CategoryDetailViewModel
            {
                Articles = articles,
                Name = id
            });
        }
    }
}
