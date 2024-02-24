using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Comments")]
    public class DbComment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Content { get; set; }
        public DateTime PublishTime { get; set; }
        public DbArticle Article { get; set; }
        public DbUser Sender { get; set; }
    }
}
