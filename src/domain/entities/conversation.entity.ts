import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  user_id: UUID;

  @Column()
  summary: string;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;
}
