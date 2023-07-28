using System.Security.Policy;

namespace Blog.Models.Feedback
{
    public class Comment
    {
        public long Id { get; set; }

        public string Content { get; set; }

        public string Author { get; set; }

        public string EmailAddress { get; set; }

        public string IPAddress { get; set; }

        public string ArticleId { get; set; }

        public DateTime Time { get; set; }
    }
}
