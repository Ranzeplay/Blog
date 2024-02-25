using Backend.Data;

namespace Backend.Models.Tag
{
    public class TagViewModel(DbTag tag)
    {
        public string Slug { get; set; } = tag.Slug;
        public string Name { get; set; } = tag.Name;

        public IEnumerable<string> ArticleSlugs { get; set; } = tag.Articles.Select(a => a.Slug);
        public IEnumerable<string> PostSlugs { get; set; } = tag.Posts.Select(p => p.Slug);
    }
}
