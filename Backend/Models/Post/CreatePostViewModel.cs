namespace Backend.Models.Post
{
    public record CreatePostViewModel(string Title, string Slug, IEnumerable<string> TagSlugs, string CategorySlug, string Content)
    {
    }
}
