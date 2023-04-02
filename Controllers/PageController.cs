using Blog.Managers;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.CodeAnalysis;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    [Route("Page")]
    public class PageController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly string _pageDirectory;
        private readonly PageManager _pageManager;

        public PageController(IOptions<AppSettings> options, PageManager pageManager)
        {
            _appSettings = options.Value;
            _pageDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "Pages");
            _pageManager = pageManager;
        }

        [HttpGet("Read/{id}")]
        public IActionResult Read([FromRoute] string id)
        {
            // Add home page exception
            if(id == "{{ home }}")
            {
                id = _appSettings.HomePageId!;
            }

            var targetPageDirectory = Path.Combine(_pageDirectory, id);
            if (!Directory.Exists(targetPageDirectory))
            {
                return NotFound("Page doesn't exist");
            }

            var pageFilePath = Path.Combine(targetPageDirectory, "text.md");
            if (!System.IO.File.Exists(pageFilePath))
            {
                return NotFound("Page not found, please contact website operator.");
            }

            var text = System.IO.File.ReadAllText(pageFilePath);

            var model = MarkdownManager.ParseOriginalPageMarkdown(text);

            return Json(model);
        }

        [HttpGet("List/{query}")]
        [HttpGet("List")]
        public IActionResult List(string? query) 
        {
            var pages = _pageManager.GetPageMetadata();
            return Json(pages);
        }

        [HttpGet("Asset/{id}/{path}")]
        public IActionResult Asset([FromRoute] string id, [FromRoute] string path)
        {
            var assetPath = _pageManager.GetAssetPath(id, path);
            if(assetPath != null)
            {
                new FileExtensionContentTypeProvider().TryGetContentType(assetPath, out var contentType);

                if(contentType != null)
                {
                    var content = System.IO.File.ReadAllBytes(assetPath);

                    return File(content, contentType);
                }
            }

            return NotFound("Coudn't acquire the requested asset!");
        }
    }
}
