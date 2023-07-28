using Blog.Models.Article;

namespace Blog.Models.Category
{
    public class CategoryDetailViewModel
    {
        public IEnumerable<ArticleMetadataViewModel> Articles { get; set; } = Enumerable.Empty<ArticleMetadataViewModel>();

        public string Name { get; set; } = string.Empty;
    }
}
