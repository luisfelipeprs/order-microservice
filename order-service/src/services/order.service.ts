import { AppDataSource } from '../config/database';
import { Order } from '../database/order.entity';

export class OrderService {
  private repo = AppDataSource.getRepository(Order);

  async create(data: Partial<Order>) {
    const order = this.repo.create({ ...data, status: 'PENDING' });
    return await this.repo.save(order);
  }

  async getAll() {
    return await this.repo.find();
  }

  async getById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async markAsPaid(orderId: number) {
    const order = await this.repo.findOneBy({ id: orderId });
    if (!order) throw new Error('Order not found');
    order.status = 'PAID';
    return await this.repo.save(order);
  }
}
