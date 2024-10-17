// src/application/domain/entities/conversations.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { MessagesEntity } from './messages.entity';

@Entity('conversations')
export class ConversationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, user => user.conversations)
  user: { user_id: Users }

  @Column({ nullable: true })
  summary: string;

  @OneToMany(() => MessagesEntity, message => message.conversation)
  messages: MessagesEntity[];
}
