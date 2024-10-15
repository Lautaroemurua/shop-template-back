import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  number: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;
}
