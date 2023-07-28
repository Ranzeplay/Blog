namespace Blog.Models.Article
{
    public class ArticleMetadata
    {
        public string? Title { get; set; }

        public DateTime? Time { get; set; }

        public string? Category { get; set; }

        public string[]? Tags { get; set; }

        public bool Draft { get; set; }
    }
}
