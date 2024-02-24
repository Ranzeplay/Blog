using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Users")]
    public class DbUser
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string EmailAddress { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public ICollection<DbComment> Comments { get; set; } = [];
    }
}
