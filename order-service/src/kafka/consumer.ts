import { Kafka } from 'kafkajs';
import { OrderService } from '../services/order.service';

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER!] });
const consumer = kafka.consumer({ groupId: 'order-group' });

export async function consumePaymentProcessed() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment_processed', fromBeginning: true });

  const service = new OrderService();

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());
      await service.markAsPaid(data.orderId);
      console.log(`Order ${data.orderId} marked as PAID`);
    },
  });
}
