using Blog.Models.Page;

namespace Blog.Models.API
{
    public class PageViewModel
    {
        public PageMetadata? Metadata { get; set; }

        public string? Content { get; set; }
    }
}
