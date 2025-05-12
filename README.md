# Order & Payment Microservices

A demonstration of microservices communication using Node.js, TypeScript, and Apache Kafka.

## Architecture

This project implements a simple e-commerce flow with two microservices:

- **Order Service** (Port 3000): Handles order creation and management
- **Payment Service** (Port 3001): Processes payments for orders

The services communicate asynchronously through Kafka events.

## Tech Stack

- TypeScript
- Node.js & Express
- MySQL (via TypeORM)
- Apache Kafka
- Docker & Docker Compose

## Project Structure

Idk if I really will do this structure lol

```
order-microservice/
├── docker-compose.yml          # Container orchestration
├── order-service/             # Order management service
│   ├── src/
│   │   ├── controllers/      # HTTP endpoints
│   │   ├── services/         # Business logic
│   │   ├── database/         # Data models
│   │   ├── kafka/           # Event handlers
│   │   └── clients/         # External service clients
│   └── Dockerfile
└── payment-service/          # Payment processing service
    ├── src/
    │   ├── controllers/
    │   ├── services/
    │   ├── database/
    │   └── kafka/
    └── Dockerfile
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```sh
cd order-service && npm install
cd ../payment-service && npm install
```

3. Start infrastructure:
```sh
docker-compose up -d
```

4. Create `.env` files in both services using the provided examples

5. Start the services:
```sh
# Terminal 1
cd order-service && npm run dev

# Terminal 2
cd payment-service && npm run dev
```

## API Endpoints

### Order Service (localhost:3000)

- `POST /orders` - Create new order
- `GET /orders` - List all orders
- `GET /orders/:id` - Get order details
- `GET /orders/:id/with-payment` - Get order with payment info

### Payment Service (localhost:3001)

- `GET /payments` - List all payments
- `GET /payments/:orderId` - Get payment by order ID

## Event Flow

1. Order Creation:
   - Order created in order-service
   - `order_created` event published
   - Payment service processes payment
   - `payment_processed` event published
   - Order status updated to PAID

## Development

- Use `npm run dev` for development with hot reload
- Run `npm run build` to generate production build
- TypeORM handles database migrations automatically

## Environment Variables

Required environment variables for each service:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=orders/payments

# Kafka
KAFKA_BROKER=localhost:9092

# Service URLs
PAYMENT_SERVICE_URL=http://payment-service:3001

