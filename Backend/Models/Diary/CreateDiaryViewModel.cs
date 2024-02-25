namespace Backend.Models.Diary
{
    public record CreateDiaryViewModel(string Title, string Slug, IEnumerable<string> TagSlugs, string CategorySlug, string Content)
    {
    }
}
