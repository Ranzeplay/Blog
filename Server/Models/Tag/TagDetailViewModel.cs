using Blog.Models.Article;

namespace Blog.Models.Tag
{
    public class TagDetailViewModel
    {
        public IEnumerable<ArticleMetadataViewModel> Articles { get; set; } = Enumerable.Empty<ArticleMetadataViewModel>();

        public string Name { get; set; } = string.Empty;
    }
}
