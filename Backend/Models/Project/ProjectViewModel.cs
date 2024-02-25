using Backend.Data;

namespace Backend.Models.Project
{
    public class ProjectViewModel(DbProject project)
    {
        public Guid Id { get; set; } = project.Id;
        public string Slug { get; set; } = project.Slug;
        public string Name { get; set; } = project.Name;
        public string Description { get; set; } = project.Description;
        public string Introduction { get; set; } = project.Introduction;

        public string IconUrl { get; set; } = project.IconUrl;
        public string HeadImageUrl { get; set; } = project.HeadImageUrl;

        public string SiteUrl { get; set; } = project.SiteUrl;
        public Dictionary<string, string> ExternalUrls { get; set; } = project.ExternalUrls;
    }
}
