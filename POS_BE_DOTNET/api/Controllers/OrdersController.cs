using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Models.DTOs;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(ApplicationDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

       // GET: api/orders
[HttpGet]
public async Task<ActionResult<object>> GetOrders(
    [FromQuery] string? status = null,
    [FromQuery] string? sortBy = "createdAt",
    [FromQuery] string? sortOrder = "desc")
{
    try
    {
        var query = _context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .AsQueryable();

        // Sorting
        query = sortBy?.ToLower() switch
        {
            "totalamount" => sortOrder?.ToLower() == "asc"
                ? query.OrderBy(o => o.TotalAmount)
                : query.OrderByDescending(o => o.TotalAmount),

            _ => sortOrder?.ToLower() == "asc"
                ? query.OrderBy(o => o.CreatedAt)
                : query.OrderByDescending(o => o.CreatedAt)
        };

        var orders = await query.ToListAsync();
        var orderResponses = orders.Select(OrderResponse.FromOrder).ToList();

        return Ok(new
        {
            success = true,
            message = "Lấy danh sách đơn hàng thành công",
            data = orderResponses
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Lỗi khi lấy danh sách đơn hàng");
        return StatusCode(500, new
        {
            success = false,
            message = "Đã xảy ra lỗi khi lấy danh sách đơn hàng",
            error = ex.Message
        });
    }
}

       

// POST: api/orders
[HttpPost]
public async Task<ActionResult<object>> CreateOrder(
    [FromBody] List<OrderItemRequest> items
)
{
    try
    {
        // Validate request
        if (items == null || !items.Any())
        {
            return BadRequest(new
            {
                success = false,
                message = "Đơn hàng phải có ít nhất một sản phẩm"
            });
        }

        var orderNumber = $"ORD{DateTime.Now:yyyyMMddHHmmss}";

        var order = new Order
        {
            OrderNumber = orderNumber,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            OrderItems = new List<OrderItem>()
        };

        decimal totalAmount = 0;

        foreach (var item in items)
        {
            if (item.Quantity <= 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Số lượng sản phẩm phải lớn hơn 0"
                });
            }

            int productId = item.ProductId;

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = $"Không tìm thấy sản phẩm có ID {productId}"
                });
            }

            var subtotal = product.Price * item.Quantity;
            totalAmount += subtotal;

            order.OrderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Quantity = item.Quantity,
                Price = product.Price,
                Subtotal = subtotal
            });
        }

        order.TotalAmount = totalAmount;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Tạo đơn hàng thành công"
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Lỗi khi tạo đơn hàng");

        return StatusCode(500, new
        {
            success = false,
            message = "Đã xảy ra lỗi khi tạo đơn hàng",
            error = ex.Message
        });
    }
}


    }

}

