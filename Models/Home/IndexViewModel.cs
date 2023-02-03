using Blog.Models.Article;

namespace Blog.Models.Home
{
    public class IndexViewModel
    {
        public ArticleMetadataViewModel[] LatestArticles { get; set; }
    }
}
