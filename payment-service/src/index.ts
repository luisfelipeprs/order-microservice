import 'dotenv/config'
import express from 'express';
import { AppDataSource } from './config/database';
import { consumerOrderCreated } from './kafka/consumer';
import paymentRoutes from './controllers/payment.controller';

const PORT = 3001;

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log('payment db connected');
  consumerOrderCreated();
})

app.use('/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`application is running on port: ${PORT}`)
});