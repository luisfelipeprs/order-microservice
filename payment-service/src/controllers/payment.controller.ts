import { Request, Response, Router } from 'express';
import { PaymentService } from '../services/payment.service';

const router = Router();
const service = new PaymentService();

router.get('/', async (_req: Request, res: Response) => {
  const payments = await service.findAll();
  res.json(payments);
});

router.get('/:orderId', async (req, res) => {
  const payment = await service.findByOrderId(Number(req.params.orderId));
  if (!payment) res.status(404).json({ message: 'Not found' });
  res.json(payment);
});

export default router;
