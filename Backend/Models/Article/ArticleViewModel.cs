using Backend.Data;
using Backend.Models.Category;
using Backend.Models.Tag;

namespace Backend.Models.Article
{
    public class ArticleViewModel(DbArticle article)
    {
        public string Title { get; set; } = article.Title;
        public string Slug { get; set; } = article.Slug;
        public DateTime PublishTime { get; set; } = article.PublishTime;
        public DateTime LastModifiedTime { get; set; } = article.LastModifiedTime;
        public IEnumerable<TagViewModel> Tags { get; set; } = article.Tags.Select(t => new TagViewModel(t));
        public CategoryViewModel Category { get; set; } = new CategoryViewModel(article.Category);
        public string Content { get; set; } = article.Content;
    }
}
