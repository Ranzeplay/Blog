using Blog.Models.Article;

namespace Blog.Models.API
{
    public class ArticleViewModel
    {
        public ArticleMetadata? Metadata { get; set; }

        public string? Content { get; set; }
    }
}
