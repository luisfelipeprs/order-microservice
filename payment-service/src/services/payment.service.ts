import { AppDataSource } from '../config/database';
import { Payment } from '../database/payment.entity';

export class PaymentService {
  private repo = AppDataSource.getRepository(Payment);

  async create(paymentData: Partial<Payment>) {
    const payment = this.repo.create(paymentData);
    return await this.repo.save(payment);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findByOrderId(orderId: number) {
    return await this.repo.findOneBy({ orderId });
  }
}
