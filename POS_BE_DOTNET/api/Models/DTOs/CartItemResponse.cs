namespace api.Models.DTOs
{
    public class CartItemResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public int Quantity { get; set; }

        public static CartItemResponse FromOrderItem(OrderItem orderItem)
        {
            return new CartItemResponse
            {
                Id = orderItem.ProductId.ToString(),
                Name = orderItem.ProductName,
                Price = orderItem.Price,
                Image = orderItem.Product?.ImageUrl ?? "",
                Quantity = orderItem.Quantity
            };
        }
    }
}

