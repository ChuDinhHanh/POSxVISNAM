# API Setup Guide

## Backend Configuration

Base URL: `http://localhost:5038`

## Required Endpoints

### Products
- **GET** `/api/products` - Lấy danh sách sản phẩm
- **GET** `/api/products/{id}` - Lấy chi tiết sản phẩm

### Orders  
- **GET** `/api/orders` - Lấy danh sách đơn hàng
- **POST** `/api/orders` - Tạo đơn hàng mới
- **DELETE** `/api/orders` - Xóa tất cả đơn hàng

## Request/Response Format

### Product Model
```json
{
  "id": "string",
  "name": "string", 
  "price": number,
  "image": "string"
}
```

### Order Model
```json
{
  "id": "string",
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": number,
      "image": "string",
      "quantity": number
    }
  ],
  "totalAmount": number,
  "createdAt": number,
  "status": "completed" | "pending"
}
```

### Create Order Request
```json
{
  "items": CartItem[],
  "totalAmount": number
}
```

## Environment Variables

Tạo file `.env.development` hoặc `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5038
```

## CORS Configuration

Đảm bảo backend .NET cho phép requests từ frontend:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

## Testing

1. Chạy backend .NET: `dotnet run`
2. Chạy frontend: `npm run dev`
3. Mở browser: `http://localhost:5173`

## Features

- ✅ Auto-refresh orders mỗi 5 giây
- ✅ Caching products (5 phút) 
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Offline cart support



