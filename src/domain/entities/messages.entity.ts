// src/application/domain/entities/messages.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ConversationsEntity } from './conversations.entity';

@Entity('messages')
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ConversationsEntity, conversation => conversation.messages)
  conversation: ConversationsEntity;

  @Column()
  message: string;

  @Column()
  role: string;  // Puede ser 'user' o 'bot'

  @Column()
  tokens: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
