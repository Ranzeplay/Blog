namespace Backend.Models
{
    public class ArticleMetadata()
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ShortContent { get; set; }
        public DateTime PublishTime { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}
