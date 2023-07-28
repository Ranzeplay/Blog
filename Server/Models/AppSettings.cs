namespace Blog.Models
{
    public class AppSettings
    {
        public string BlogStorageRootDirectory { get; set; } = "Storage";

        public string? HomePageId { get; set; }
    }
}
