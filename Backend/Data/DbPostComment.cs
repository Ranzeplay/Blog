using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("PostComments")]
    public class DbPostComment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Content { get; set; }
        public DateTime PublishTime { get; set; }
        public DbPost Article { get; set; }
        public DbUser Sender { get; set; }
    }
}
