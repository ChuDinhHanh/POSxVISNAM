namespace api.Models.DTOs
{
    public class OrderResponse
    {
        public string Id { get; set; } = string.Empty;
        public List<CartItemResponse> Items { get; set; } = new List<CartItemResponse>();
        public decimal TotalAmount { get; set; }
        public long CreatedAt { get; set; }

        public static OrderResponse FromOrder(Order order)
        {
            var unixTimestamp = ((DateTimeOffset)order.CreatedAt).ToUnixTimeMilliseconds();

            return new OrderResponse
            {
                Id = order.Id.ToString(),
                Items = order.OrderItems.Select(oi => CartItemResponse.FromOrderItem(oi)).ToList(),
                TotalAmount = order.TotalAmount,
                CreatedAt = unixTimestamp,
            };
        }
    }
}

