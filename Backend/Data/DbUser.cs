using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Users")]
    [Index(nameof(Username))]
    public class DbUser
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string EmailAddress { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public ICollection<DbArticleComment> ArticleComments { get; set; } = [];
        public ICollection<DbPostComment> PostComments { get; set; } = [];
    }
}
