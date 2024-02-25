using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Backend.Data
{
    public class PersistentDbContext(DbContextOptions<PersistentDbContext> options) : DbContext(options)
    {
        public DbSet<DbUser> Users { get; set; }
        public DbSet<DbArticle> Articles { get; set; }
        public DbSet<DbCategory> Categories { get; set; }
        public DbSet<DbTag> Tags { get; set; }
        public DbSet<DbArticleComment> ArticleComments { get; set; }
        public DbSet<DbPostComment> PostComments { get; set; }
        public DbSet<DbDiary> Diaries { get; set; }
        public DbSet<DbPost> Posts { get; set; }
        public DbSet<DbProject> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>()
                .HasMany(e => e.ArticleComments)
                .WithOne(e => e.Sender);
            modelBuilder.Entity<DbUser>()
                .Navigation(e => e.ArticleComments)
                .EnableLazyLoading();
            modelBuilder.Entity<DbUser>()
                .HasMany(e => e.PostComments)
                .WithOne(e => e.Sender);
            modelBuilder.Entity<DbUser>()
                .Navigation(e => e.PostComments)
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

            modelBuilder.Entity<DbPost>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Posts)
                .UsingEntity(j => j.ToTable("PostTag"));
            modelBuilder.Entity<DbPost>()
                .Navigation(e => e.Tags)
                .EnableLazyLoading();
            modelBuilder.Entity<DbTag>()
                .Navigation(e => e.Posts)
                .EnableLazyLoading();

            modelBuilder.Entity<DbProject>()
                .Property(e => e.ExternalUrls)
                .HasColumnType("jsonb")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, new JsonSerializerOptions(JsonSerializerDefaults.General)),
                    v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, new JsonSerializerOptions(JsonSerializerDefaults.General))
                );
        }
    }
}
