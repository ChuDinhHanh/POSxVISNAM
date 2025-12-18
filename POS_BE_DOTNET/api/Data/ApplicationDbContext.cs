using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure decimal precision
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Subtotal)
                .HasPrecision(18, 2);

            // Seed data for products
            modelBuilder.Entity<Product>().HasData(
    new Product
    {
        Id = 1,
        Name = "Cà phê đen",
        Price = 25000,
        ImageUrl = "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400"
    },
    new Product
    {
        Id = 2,
        Name = "Cà phê sữa",
        Price = 30000,
        ImageUrl = "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
    },
    new Product
    {
        Id = 3,
        Name = "Trà sữa trân châu",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400"
    },
    new Product
    {
        Id = 4,
        Name = "Bánh mì thịt",
        Price = 20000,
        ImageUrl = "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400"
    },
    new Product
    {
        Id = 5,
        Name = "Bánh ngọt",
        Price = 15000,
        ImageUrl = "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400"
    },
    new Product
    {
        Id = 6,
        Name = "Sinh tố bơ",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400"
    },
    new Product
    {
        Id = 7,
        Name = "Nước cam",
        Price = 25000,
        ImageUrl = "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"
    },
    new Product
    {
        Id = 8,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    new Product
    {
        Id = 9,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    new Product
    {
        Id = 10,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    new Product
    {
        Id = 11,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    new Product
    {
        Id = 12,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    },
    new Product
    {
        Id = 13,
        Name = "Sandwich",
        Price = 35000,
        ImageUrl = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400"
    }
);

        }
    }
}