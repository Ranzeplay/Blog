using System.ComponentModel.DataAnnotations;

namespace Backend.Data
{
    public class DbPost
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Slug { get; set; }
        public string Title { get; set; }

        public string? HeadImageUrl { get; set; }

        public DateTime PublishTime { get; set; } = DateTime.UtcNow;
        public DateTime LastModifiedTime { get; set; } = DateTime.UtcNow;

        public ICollection<DbTag> Tags { get; set; } = [];

        public bool Public { get; set; }

        public string Content { get; set; }

        public ICollection<DbPostComment> Comments { get; set; } = [];
    }
}
