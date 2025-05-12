import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  item!: string;

  @Column()
  quantity!: number;

  @Column()
  status!: string; // PENDING | PAID
}
