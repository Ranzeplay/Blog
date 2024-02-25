using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Diaries")]
    [Index(nameof(Date))]
    public class DbDiary
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Content { get; set; }
        public string Weather { get; set; }
        public string Mood { get; set; }
    }
}
