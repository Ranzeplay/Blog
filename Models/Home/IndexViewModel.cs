using Blog.Models.Article;

namespace Blog.Models.Home
{
    public class IndexViewModel
    {
        public IEnumerable<ArticleMetadataViewModel> LatestArticles { get; set; }
    }
}
