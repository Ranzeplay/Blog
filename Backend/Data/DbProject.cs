using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Projects")]
    [Index(nameof(Slug))]
    public class DbProject
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Introduction { get; set; }

        public string? IconUrl { get; set; }
        public string? HeadImageUrl { get; set; }

        public string SiteUrl { get; set; }
        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> ExternalUrls { get; set; }
    }
}
