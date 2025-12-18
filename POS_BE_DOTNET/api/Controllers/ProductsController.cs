using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Models.DTOs;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(ApplicationDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/products
        [HttpGet]
       public async Task<ActionResult<object>> GetProducts(
    [FromQuery] string? category = null,
    [FromQuery] string? search = null)
{
    try
    {
        var query = _context.Products.AsQueryable();
      
        // Lấy toàn bộ danh sách theo điều kiện lọc mà không phân trang
        var products = await query
            .OrderBy(p => p.Id)
            .ToListAsync();

        var productResponses = products.Select(p => ProductResponse.FromProduct(p)).ToList();

        return Ok(new
        {
            success = true,
            message = "Lấy danh sách sản phẩm thành công",
            data = productResponses // Trả về mảng trực tiếp trong data
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Lỗi khi lấy danh sách sản phẩm");
        return StatusCode(500, new
        {
            success = false,
            message = "Đã xảy ra lỗi khi lấy danh sách sản phẩm",
            error = ex.Message
        });
    }
}
    }
}

