import { Request, Response, Router } from 'express';
import { OrderService } from '../services/order.service';
import { produceOrderCreated } from '../kafka/producer';
import { getPaymentByOrderId } from '../clients/payment-client';

const router = Router();
const service = new OrderService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const order = await service.create(req.body);
    await produceOrderCreated(order);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  const orders = await service.getAll();
  res.json(orders);
});

router.get('/:id', async (req: Request, res: Response) => {
  const order = await service.getById(Number(req.params.id));
  if (!order) res.status(404).json({ message: 'Pedido não encontrado' });
  res.json(order);
});

router.get('/:id/with-payment', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const order = await service.getById(id);
  if (!order) res.status(404).json({ message: 'Pedido não encontrado' });

  const payment = await getPaymentByOrderId(id);

  res.json({ order, payment });
});

export default router;
