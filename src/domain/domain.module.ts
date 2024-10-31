// src/domain/domain.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversation.entity';
import { MessagesEntity } from './entities/messages.entity';
import { ConfigurationEntity } from './entities/configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationEntity, MessagesEntity, ConfigurationEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DomainModule {}
