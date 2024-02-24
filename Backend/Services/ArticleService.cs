using Backend.Models;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;

namespace Backend.Services
{
    public class ArticleService
    {
        private readonly AppSettings _appSettings;
        private readonly string _articleStoreDirectory;

        private readonly MarkdownService _markdownService;

        private readonly Dictionary<string, ArticleDeprecated> _indexedArticles;

        private readonly FileExtensionContentTypeProvider _fileExtensionContentTypeProvider = new();

        private readonly ILogger _logger;

        public ArticleService(IOptions<AppSettings> options, MarkdownService markdownService, ILogger<ArticleService> logger)
        {
            _markdownService = markdownService;

            _appSettings = options.Value;
            _articleStoreDirectory = Path.Combine(Environment.CurrentDirectory, _appSettings.ContentDirectory, "articles");

            Directory.CreateDirectory(_articleStoreDirectory);

            _logger = logger;

            _indexedArticles = [];

            RefreshCacheAsync().Wait();
        }

        public IEnumerable<ArticleMetadata> GetArticles()
        {
            return _indexedArticles.Values.Select(article => article.Metadata);
        }

        public IEnumerable<ArticleMetadata> GetByCategory(string categoryName)
        {
            return _indexedArticles.Values
                .Select(article => article.Metadata)
                .Where(metadata => metadata.Category.Equals(categoryName));
        }

        public IEnumerable<ArticleMetadata> GetByAnyTag(IEnumerable<string> tags)
        {
            return _indexedArticles.Values
                .Select(article => article.Metadata)
                .Where(article => article.Tags.Intersect(tags).Any());
        }

        public IEnumerable<ArticleMetadata> GetByAllTag(IEnumerable<string> tags)
        {
            return _indexedArticles.Values
                .Select(article => article.Metadata)
                .Where(article => article.Tags.All(t => tags.Contains(t)));
        }

        public ArticleDeprecated? GetArticle(string id)
        {
            return _indexedArticles.GetValueOrDefault(id);
        }

        public ContentAsset? GetAsset(string id, string name)
        {
            if (!_indexedArticles.ContainsKey(id))
            {
                return null;
            }

            var path = Path.Combine(_articleStoreDirectory, id, "assets", name);
            var content = File.ReadAllBytes(path);
            _fileExtensionContentTypeProvider.TryGetContentType(name, out var contentType);

            return new(name, contentType ?? "application/octet-stream", content);
        }

        public ContentAsset? GetHeadImage(string id)
        {
            var directory = Path.Combine(_articleStoreDirectory, id);
            var path = Directory.GetFiles(directory, "head.*").FirstOrDefault();
            if (path == null)
            {
                return null;
            }

            var content = File.ReadAllBytes(path);
            _fileExtensionContentTypeProvider.TryGetContentType(path, out var contentType);

            return new(Path.GetFileName(path), contentType ?? "application/octet-stream", content);
        }

        public async Task RefreshCacheAsync()
        {
            _indexedArticles.Clear();

            foreach (var articleEntryDirectory in Directory.GetDirectories(_articleStoreDirectory))
            {
                var textFile = await File.ReadAllTextAsync(Path.Combine(articleEntryDirectory, "text.md"));
                var article = _markdownService.ParseArticle(textFile)!;
                article.Metadata.Id = Path.GetFileName(articleEntryDirectory)!;

                _indexedArticles.TryAdd(article.Metadata.Id, article);
            }

            _logger.LogInformation("Currently cached {} article(s)", _indexedArticles.Count);
        }
    }
}
