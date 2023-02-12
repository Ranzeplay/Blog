using Blog.Models.Article;

namespace Blog.Models.Category
{
    public class CategoryDetailViewModel
    {
        public IEnumerable<ArticleMetadataViewModel> Articles { get; set; }

        public string Name { get; set; }
    }
}
