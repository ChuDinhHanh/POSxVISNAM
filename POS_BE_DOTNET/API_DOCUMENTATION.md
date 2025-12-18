```json
{
  "baseUrl": "http://localhost:5038",
  "swagger": "http://localhost:5038/swagger",
  "database": "In-Memory Database"
}

Standard API Response Format

{
  "success": true,
  "message": "Message description",
  "data": {}
}

Data Models

1 - Product

{
  "id": "string",
  "name": "string",
  "price": 25000,
  "image": "string"
}

2 - CartItem

{
  "id": "string",
  "name": "string",
  "price": 25000,
  "image": "string",
  "quantity": 2
}

3 - Order

{
  "id": "string",
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": 25000,
      "image": "string",
      "quantity": 2
    }
  ],
  "totalAmount": 50000,
  "createdAt": 1734429177495,
}

5 - Products API

GET /api/products
{
  "method": "GET",
  "endpoint": "/api/products",
  "response": {
    "success": true,
    "message": "Get products successfully",
    "data": [
      {
        "id": "1",
        "name": "Cà phê đen",
        "price": 25000,
        "image": "https://images.unsplash.com/..."
      }
    ]
  }
}

6 - Orders API

GET /api/orders
{
  "method": "GET",
  "endpoint": "/api/orders",
  "response": {
    "success": true,
    "message": "Get orders successfully",
    "data": {
      "orders": [
        {
          "id": "1",
          "items": [
            {
              "id": "1",
              "name": "Cà phê đen",
              "price": 25000,
              "image": "https://...",
              "quantity": 2
            }
          ],
          "totalAmount": 50000,
          "createdAt": 1734429177495,
          "status": "pending"
        }
      ]
    }
  }
}
```
