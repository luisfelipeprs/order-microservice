# Microservices communication with Nodejs and Kafka


## Project Struct

order-microservice/
├── docker-compose.yml
├── .env
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── config/
│       │   └── database.ts
│       ├── controllers/
│       │   └── order.controller.ts
│       ├── database/
│       │   └── order.entity.ts
│       ├── kafka/
│       │   ├── producer.ts
│       │   └── consumer.ts
│       └── services/
│           └── order.service.ts
├── payment-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── config/
│       │   └── database.ts
│       ├── controllers/
│       │   └── payment.controller.ts
│       ├── database/
│       │   └── payment.entity.ts
│       ├── kafka/
│       │   ├── producer.ts
│       │   └── consumer.ts
│       └── services/
│           └── payment.service.ts


## Description

Do a 2 microservice then communicate beetwen there. 

### Order Microservice

- create orders in database
- process orders (update data, parallelism, safe transactions)
- communicate with another microservice using kafka



### saga-orquestration

- use saga pattern to orquestre containers (probably u will use C# or something like that, but prefer use Typescript)

