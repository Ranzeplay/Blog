using Blog.Models;
using Blog.Models.Article;
using Blog.Models.Category;
using Microsoft.Extensions.Options;

namespace Blog.Managers
{
    public class ArticleManager
    {
        private readonly string _articleDirectory;
        private IEnumerable<ArticleMetadataViewModel> IndexedArticles { get; set; }

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

        public IEnumerable<ArticleMetadataViewModel> GetArticleMetadata(int maxCount = -1)
        {
            return maxCount switch
            {
                -1 => IndexedArticles,
                _ => IndexedArticles.TakeLast(maxCount)
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

        public IEnumerable<CategoryIndexViewModel> GetCategoriesWithCount()
        {
            var result = new List<CategoryIndexViewModel>();

            foreach (var article in IndexedArticles)
            {
                var index = result.FindIndex(r => r.Name == article.Category);

                if (index == -1)
                {
                    result.Add(new CategoryIndexViewModel
                    {
                        Name = article.Category!,
                        Count = 1
                    });
                }
                else
                {
                    result[index].Count++;
                }
            }

            return result;
        }

        public IEnumerable<ArticleMetadataViewModel> FindByCategory(string name)
        {
            return IndexedArticles.Where(a => a.Category.Equals(name));
        }
    }
}
