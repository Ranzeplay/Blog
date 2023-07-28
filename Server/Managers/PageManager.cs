using Blog.Models;
using Blog.Models.Article;
using Blog.Models.Category;
using Blog.Models.Page;
using Blog.Models.Tag;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Blog.Managers
{
    public class PageManager
    {
        private readonly string _pageDirectory;
        private readonly IMemoryCache _memoryCache;
        private readonly ILogger _logger;
        private IEnumerable<PageMetadataViewModel> IndexedPages { get; set; }

        public PageManager(IOptions<AppSettings> options, IMemoryCache memoryCache, ILogger<ArticleManager> logger)
        {
            _pageDirectory = Path.Combine(Environment.CurrentDirectory, options.Value.BlogStorageRootDirectory, "Pages");
            IndexedPages = Array.Empty<PageMetadataViewModel>();
            _memoryCache = memoryCache;
            _logger = logger;

            IndexPages();
        }

        private void IndexPages()
        {
            var result = new List<PageMetadataViewModel>();

            foreach (var pageDirectory in Directory.GetDirectories(_pageDirectory))
            {
                var file = Path.Combine(pageDirectory, "text.md");
                var text = File.ReadAllText(file);

                var metadata = MarkdownManager.ParseMarkdownMetadata<PageMetadata>(text);
                if (metadata != null)
                {
                    result.Add(new()
                    {
                        PageId = Path.GetFileName(pageDirectory),
                        Title = metadata.Title,
                        LastUpdateTime = metadata.LastUpdateTime,
                    });
                }
            }

            IndexedPages = result.ToArray();
        }

        public IEnumerable<PageMetadataViewModel> GetPageMetadata(int maxCount = -1)
        {
            return maxCount switch
            {
                -1 => IndexedPages,
                _ => IndexedPages.TakeLast(maxCount)
            };
        }

        /// <summary>
        /// Get file path of an asset
        /// </summary>
        /// <param name="articleId">The Id of the article</param>
        /// <param name="assetName">The name of the asset</param>
        /// <returns>Return null if the asset doesn't found</returns>
        public string? GetAssetPath(string articleId, string assetName)
        {
            var targetArticleDirectory = Path.Combine(_pageDirectory, articleId);
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
            var key = $"{articleId}.{assetName}";
            if (_memoryCache.TryGetValue<BlogAsset>(key, out var asset))
            {
                return asset;
            }
            else
            {
                var path = GetAssetPath(articleId, assetName);
                if (File.Exists(path))
                {
                    var item = new BlogAsset(path);
                    _memoryCache.Set(key, item, new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(2)));
                    _logger.LogInformation($"Cached asset in article, whose id is {key}");

                    return item;
                }
            }

            return null;
        }
    }
}
