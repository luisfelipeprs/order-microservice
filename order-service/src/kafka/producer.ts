import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER!] });
const producer = kafka.producer();

export async function produceOrderCreated(order: any) {
  await producer.connect();
  await producer.send({
    topic: 'order_created',
    messages: [{ value: JSON.stringify(order) }],
  });
  await producer.disconnect();
}
