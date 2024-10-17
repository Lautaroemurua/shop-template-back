// src/application/domain/entities/users.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ConversationsEntity } from './conversations.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @OneToMany(() => ConversationsEntity, conversation => conversation.user)
  conversations: ConversationsEntity[];
}
