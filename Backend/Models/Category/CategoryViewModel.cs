using Backend.Data;

namespace Backend.Models.Category
{
    public class CategoryViewModel(DbCategory category)
    {
        public string Slug { get; set; } = category.Slug;
        public string Name { get; set; } = category.Name;

        public IEnumerable<string> ArticleSlugs { get; set; } = category.Articles.Select(a => a.Slug);
    }
}
