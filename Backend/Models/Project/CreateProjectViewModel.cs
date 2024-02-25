namespace Backend.Models.Project
{
    public record CreateProjectViewModel(string Name, string Slug, string Description, string Introduction, string IconUrl, string HeadImageUrl, string SiteUrl, Dictionary<string, string> ExternalUrls);
}
