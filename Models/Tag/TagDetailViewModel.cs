using Blog.Models.Article;

namespace Blog.Models.Tag
{
    public class TagDetailViewModel
    {
        public IEnumerable<ArticleMetadataViewModel> Articles { get; set; }

        public string Name { get; set; }
    }
}
