using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Projects")]
    public class DbProject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Introduction { get; set; }

        public string IconUrl { get; set; }
        public string HeadImageUrl { get; set; }

        public string SiteUrl { get; set; }
        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> ExternalUrls { get; set; }
    }
}
