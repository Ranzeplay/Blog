using Blog.Managers;
using Blog.Models;
using Blog.Models.Home;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Blog.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ArticleManager _articleManager;

        public HomeController(ILogger<HomeController> logger, ArticleManager articleManager)
        {
            _logger = logger;
            _articleManager = articleManager;
        }

        public IActionResult Index()
        {
            // Get latest blogs
            var latestArticles = _articleManager.GetArticleMetadata(3);

            return View(new IndexViewModel
            {
                LatestArticles = latestArticles,
            });
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}