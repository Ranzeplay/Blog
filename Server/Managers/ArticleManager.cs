using Blog.Controllers;
using Blog.Models;
using Blog.Models.Article;
using Blog.Models.Category;
using Blog.Models.Tag;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Blog.Managers
{
    public class ArticleManager
    {
        private readonly string _articleDirectory;
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger _logger;
        private readonly AppSettings _appSettings;
        private IEnumerable<ArticleMetadataViewModel> IndexedArticles { get; set; }

        public ArticleManager(IOptions<AppSettings> options, IMemoryCache memoryCache, ILogger<ArticleManager> logger)
        {
            _appSettings = options.Value;
            _articleDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "Articles");
            IndexedArticles = Array.Empty<ArticleMetadataViewModel>();
            _memoryCache = memoryCache;
            _logger = logger;

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

        public BlogAsset? GetHeadImage(string articleId)
        {
            var key = $"{articleId}";
            if (_memoryCache.TryGetValue<BlogAsset>(key, out var asset))
            {
                return asset;
            }
            else
            {
                var targetArticleDirectory = Path.Combine(_articleDirectory, articleId);
                var assetFile = Path.Combine(targetArticleDirectory, "head.png");
                if (!File.Exists(assetFile))
                {
                    assetFile = Path.Combine(Environment.CurrentDirectory, _appSettings.BlogStorageRootDirectory, "fallback.png");
                }

                var item = new BlogAsset(assetFile);
                _memoryCache.Set(key, item, new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(2)));
                _logger.LogInformation($"Cache head image asset in page, whose id is {key}");

                return item;
            }
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

        public BlogAsset? GetAsset(string pageId, string assetName)
        {
            var key = $"{pageId}.{assetName}";
            if (_memoryCache.TryGetValue<BlogAsset>(key, out var asset))
            {
                return asset;
            }
            else
            {
                var path = GetAssetPath(pageId, assetName);
                if (File.Exists(path))
                {
                    var item = new BlogAsset(path);
                    _memoryCache.Set(key, item, new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(2)));
                    _logger.LogInformation($"Cache asset in page, whose id is {key}");

                    return item;
                }
            }

            return null;
        }
    }
}
