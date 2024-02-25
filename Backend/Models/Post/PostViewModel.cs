using Backend.Data;
using Backend.Models.Tag;

namespace Backend.Models.Post
{
    public class PostViewModel(DbPost post)
    {
        public string Title { get; set; } = post.Title;
        public string Slug { get; set; } = post.Slug;
        public DateTime PublishTime { get; set; } = post.PublishTime;
        public DateTime LastModifiedTime { get; set; } = post.LastModifiedTime;
        public IEnumerable<string> Tags { get; set; } = post.Tags.Select(t => t.Slug);
        public string Content { get; set; } = post.Content;
    }
}
