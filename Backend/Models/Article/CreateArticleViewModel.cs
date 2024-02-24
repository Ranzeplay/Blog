namespace Backend.Models.Article
{
    public record CreateArticleViewModel(string Title, string Slug, IEnumerable<string> TagSlugs, string CategorySlug, string Content)
    {
    }
}
