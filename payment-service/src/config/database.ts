import { DataSource } from 'typeorm'
import { Payment } from '../database/payment.entity'

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Payment],
});