namespace api.Models.DTOs
{
    public class ProductResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;

        public static ProductResponse FromProduct(Product product)
        {
            return new ProductResponse
            {
                Id = product.Id.ToString(),
                Name = product.Name,
                Price = product.Price,
                Image = product.ImageUrl
            };
        }
    }
}

