import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import orderRoutes from './controllers/order.controller';
import { consumePaymentProcessed } from './kafka/consumer';

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  console.log('Order DB connected');
  consumePaymentProcessed();
});

app.use('/orders', orderRoutes);

app.listen(3000, () => console.log('Order service listening on port 3000'));