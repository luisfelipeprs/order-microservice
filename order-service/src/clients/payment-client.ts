import axios from 'axios';

const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://payment-service:3001';

export async function getPaymentByOrderId(orderId: number) {
  try {
    const res = await axios.get(`${PAYMENT_SERVICE_URL}/payments/${orderId}`);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null;
    }
    throw new Error('Erro ao consultar o payment-service');
  }
}
