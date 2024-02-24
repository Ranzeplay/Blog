using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendDbContext(DbContextOptions<BackendDbContext> options) : DbContext(options)
    {
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbArticle> Articles { get; set; }
        public DbSet<DbCategory> Categories { get; set; }
        public DbSet<DbTag> Tags { get; set; }
        public DbSet<DbComment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Sender);
            modelBuilder.Entity<DbUser>()
                .Navigation(e => e.Comments)
                .EnableLazyLoading();

            modelBuilder.Entity<DbCategory>()
                .HasMany(e => e.Articles)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId);
            modelBuilder.Entity<DbCategory>()
                .Navigation(e => e.Articles)
                .EnableLazyLoading();
            modelBuilder.Entity<DbArticle>()
                .Navigation(e => e.Category)
                .EnableLazyLoading();

            modelBuilder.Entity<DbArticle>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Articles)
                .UsingEntity(j => j.ToTable("ArticleTag"));
            modelBuilder.Entity<DbArticle>()
                .Navigation(e => e.Tags)
                .EnableLazyLoading();
            modelBuilder.Entity<DbTag>()
                .Navigation(e => e.Articles)
                .EnableLazyLoading();
        }
    }
}
