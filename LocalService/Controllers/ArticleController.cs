﻿using LocalService.Attributes;
using LocalService.Services;
using Microsoft.AspNetCore.Mvc;

namespace LocalService.Controllers
{
    [ServiceFilter(typeof(RequireAccessToken))]
    [Route("/api/article")]
    public class ArticleController(ArticleService articleService) : Controller
    {
        private readonly ArticleService _articleService = articleService;

        [HttpGet("index")]
        public IActionResult Index()
        {
            _articleService.RefreshCacheAsync().Wait();

            return new JsonResult(_articleService.GetArticles() ?? []);
        }

        [HttpGet("entry")]
        public IActionResult GetEntry(string articleId)
        {
            var article = _articleService.GetArticle(articleId);
            if (article != null)
            {
                return new JsonResult(article);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("asset")]
        public IActionResult Asset(string articleId, string name)
        {
            var asset = _articleService.GetAsset(articleId, name);
            if (asset == null)
            {
                return NotFound();
            }
            else
            {
                return File(asset.Content, name);
            }
        }
    }
}