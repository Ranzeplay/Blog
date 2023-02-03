using Blog.Models;
using Blog.Models.Article;
using Microsoft.Extensions.Options;

namespace Blog.Managers
{
    public class ArticleManager
    {
        private readonly string _articleDirectory;
        private ArticleMetadataViewModel[] IndexedArticles { get; set; }

        public ArticleManager(IOptions<AppSettings> options)
        {
            _articleDirectory = Path.Combine(Environment.CurrentDirectory, options.Value.BlogStorageRootDirectory, "Articles");
            IndexedArticles = Array.Empty<ArticleMetadataViewModel>();

            IndexArticles();
        }

        private void IndexArticles()
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

            IndexedArticles = result.ToArray();
        }

        public ArticleMetadataViewModel[] GetArticleMetadata(int maxCount = -1)
        {
            return maxCount switch
            {
                -1 => IndexedArticles,
                _ => IndexedArticles.TakeLast(maxCount).ToArray()
            };
        }

        public ArticleViewModel? GetArticle(string id)
        {
            var targetArticleDirectory = Path.Combine(_articleDirectory, id);
            var articleFilePath = Path.Combine(targetArticleDirectory, "text.md");
            if (!File.Exists(articleFilePath))
            {
                return null;
            }

            var text = File.ReadAllText(articleFilePath);
            var article = MarkdownManager.ParseArticleFile(text);
            return article;
        }
    }
}
