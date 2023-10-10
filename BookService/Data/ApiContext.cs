using BookService.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BookService.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public ApiContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().ToTable("Books");
            modelBuilder.Entity<Book>().Property(e => e.Category).HasConversion<string>();
        }

        public override int SaveChanges()
        {
            var added = ChangeTracker.Entries<IAuditableModel>().Where(E => E.State == EntityState.Added).ToList();

            added.ForEach(E =>
            {
                E.Property(x => x.Created).CurrentValue = DateTime.UtcNow;
                E.Property(x => x.Created).IsModified = true;
            });

            return base.SaveChanges();
        }
    }

}
