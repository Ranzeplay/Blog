using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class MemoryDbContext(DbContextOptions<MemoryDbContext> options) : DbContext(options)
    {
        public DbSet<DbFile> FileIndexes { get; set; }
    }
}
