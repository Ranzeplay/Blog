using Blog.Managers;
using Blog.Models;
using Blog.Models.Category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class CategoryController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly ArticleManager _articleManager;

        public CategoryController(IOptions<AppSettings> options, ArticleManager articleManager)
        {
            _appSettings = options.Value;
            _articleManager = articleManager;
        }

        [HttpGet]
        [Route("/Categories")]
        public IActionResult List(string? query)
        {
            var categories = _articleManager.GetCategoriesWithCount();

            if(!string.IsNullOrWhiteSpace(query)) {
                foreach(var category in categories)
                {
                    if (!category.Key.Contains(query))
                    {
                        categories.Remove(category.Key);
                    }
                }
            }

            return View(categories);
        }

        [HttpGet("/Category/{name}")]
        public IActionResult Detail([FromRoute] string name)
        {
            var articles = _articleManager.FindByCategory(name);
            if (!articles.Any())
            {
                return NotFound("No such category");
            }

            return View(new CategoryDetailViewModel
            {
                Articles = articles,
                Name = name
            });
        }
    }
}
