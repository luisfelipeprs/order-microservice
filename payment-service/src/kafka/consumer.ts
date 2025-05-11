import { Kafka } from "kafkajs";
import { AppDataSource } from "../config/database";
import { Payment } from "../database/payment.entity";



const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!]
});

const consumer = kafka.consumer({ groupId: 'payment-group' });


export async function consumerOrderCreated() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order_created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const order = JSON.parse(message.value.toString());
      const repo = AppDataSource.getRepository(Payment);

      const payment = repo.create({
        orderId: order.id,
        amount: 100,
        status: 'COMPLETED',
      });

      await repo.save(payment);
      console.log("payment created to order id: ", order.id);

      // call producer here
    }
  })
}
