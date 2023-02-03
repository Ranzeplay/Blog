using Blog.Managers;
using Blog.Models;
using Blog.Models.Article;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.Controllers
{
    public class ArticleController : Controller
    {
        private readonly AppSettings _appSettings;
        private readonly string _articleDirectory;

        public ArticleController(IOptions<AppSettings> options)
        {
            _appSettings = options.Value;
            _articleDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "Articles");
        }

        public IActionResult Read([FromRoute] string id)
        {
            var targetArticleDirectory = Path.Combine(_articleDirectory, id);
            if (!Directory.Exists(targetArticleDirectory))
            {
                return NotFound("Article doesn't exist");
            }

            var articleFilePath = Path.Combine(targetArticleDirectory, "text.md");
            if (!System.IO.File.Exists(articleFilePath))
            {
                return NotFound("Article not found, please contact website operator.");
            }

            var text = System.IO.File.ReadAllText(articleFilePath);

            var article = MarkdownManager.ParseArticleFile(text);

            return View(article);
        }

        [HttpGet]
        [Route("/Articles")]
        public IActionResult List(string? query)
        {
            var result = new List<ArticleMetadataViewModel>();

            foreach (var articleDirectory in Directory.GetDirectories(_articleDirectory))
            {
                var file = Path.Combine(articleDirectory, "text.md");
                var text = System.IO.File.ReadAllText(file);

                var metadata = MarkdownManager.ParseArticleMetadata(text);
                if (metadata != null)
                {
                    result.Add(new()
                    {
                        ArticleId = Path.GetFileName(articleDirectory),
                        Title = metadata.Title,
                        Time = metadata.Time,
                        Category = metadata.Category,
                        Tags = metadata.Tags,
                    });
                }
            }

            // Filter search query
            if (!string.IsNullOrWhiteSpace(query))
            {
                query = query.ToLower();
                result = result.FindAll(a => a.ArticleId.ToLower().Contains(query)
                || a.Tags.Any(t => t.ToLower().Contains(query))
                || a.Category.ToLower().Contains(query));
            }

            // Sort entries by time order
            result.Sort((a, b) => a.Time.Value.CompareTo(b.Time.Value));

            return View(result);
        }
    }
}
