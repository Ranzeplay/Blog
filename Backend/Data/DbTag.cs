﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Data
{
    [Table("Tags")]
    public class DbTag
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;

        public ICollection<DbArticle> Articles { get; set; } = [];
    }
}
