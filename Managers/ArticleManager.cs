using Blog.Models;
using Blog.Models.Article;
using Blog.Models.Category;
using Blog.Models.Tag;
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
                var text = File.ReadAllText(file);

                var metadata = MarkdownManager.ParseMarkdownMetadata<ArticleMetadata>(text);
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
            return IndexedArticles.Where(a => a.Category == name);
        }

        public IEnumerable<TagIndexViewModel> GetTagsWithCount()
        {
            var result = new List<TagIndexViewModel>();

            foreach (var article in IndexedArticles)
            {
                foreach (var tag in article.Tags ?? Array.Empty<string>())
                {
                    var index = result.FindIndex(r => r.Name == tag);

                    if (index == -1)
                    {
                        result.Add(new TagIndexViewModel
                        {
                            Name = tag,
                            Count = 1
                        });
                    }
                    else
                    {
                        result[index].Count++;
                    }
                }
            }

            return result;
        }

        public IEnumerable<ArticleMetadataViewModel> FindByTag(string name)
        {
            return IndexedArticles.Where(a => a.Tags != null && a.Tags.Contains(name));
        }

        /// <summary>
        /// Get file path of an asset
        /// </summary>
        /// <param name="articleId">The Id of the article</param>
        /// <param name="assetName">The name of the asset</param>
        /// <returns>Return null if the asset doesn't found</returns>
        public string? GetAssetPath(string articleId, string assetName)
        {
            var targetArticleDirectory = Path.Combine(_articleDirectory, articleId);
            var articleAssetDirectory = Path.Combine(targetArticleDirectory, "Assets");
            var assetFile = Path.Combine(articleAssetDirectory, assetName);
            if (!File.Exists(assetFile))
            {
                return null;
            }

            return assetFile;
        }

        public BlogAsset? GetAsset(string articleId, string assetName)
        {
            var path = GetAssetPath(articleId, assetName);
            if (File.Exists(path))
            {
                return new(path);
            }

            return null;
        }
    }
}
