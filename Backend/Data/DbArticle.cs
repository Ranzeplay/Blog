using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Articles")]
    [Index(nameof(Slug))]
    public class DbArticle
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Slug { get; set; }
        public string Title { get; set; }

        public DateTime PublishTime { get; set; } = DateTime.UtcNow;
        public DateTime LastModifiedTime { get; set; } = DateTime.UtcNow;

        public ICollection<DbTag> Tags { get; set; } = [];
        public DbCategory Category { get; set; }

        public bool Public { get; set; } 

        public string Content { get; set; }

        public ICollection<DbComment> Comments { get; set; } = [];

        public Guid CategoryId { get; internal set; }
    }
}
