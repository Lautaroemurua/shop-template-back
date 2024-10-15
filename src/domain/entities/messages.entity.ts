import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mesages {
  @PrimaryGeneratedColumn()
  conversation_id: UUID;

  @Column()
  message: string;

  @Column()
  role: string;

  @Column()
  tokens: number;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;
}
