using Blog.Models.Feedback;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Comment> Comments { get; set; }
    }
}
