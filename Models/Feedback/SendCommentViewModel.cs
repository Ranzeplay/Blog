namespace Blog.Models.Feedback
{
    public class SendCommentViewModel
    {
        public string Content { get; set; }

        public string Author { get; set; }

        public string EmailAddress { get; set; }
        
        public string ArticleId { get; set; }
    }
}
