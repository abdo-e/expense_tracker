using Microsoft.EntityFrameworkCore;
using ExpenseTracker.API.Models;

namespace ExpenseTracker.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Food", Icon = "fastfood" },
                new Category { Id = 2, Name = "Transport", Icon = "directions_car" },
                new Category { Id = 3, Name = "Entertainment", Icon = "movie" },
                new Category { Id = 4, Name = "Shopping", Icon = "shopping_cart" },
                new Category { Id = 5, Name = "Health", Icon = "medical_services" }
            );
        }
    }
}
