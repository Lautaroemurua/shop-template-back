// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './repositories/conversation.repository';
import { MessagesRepository } from './repositories/messages.repository';
import { ConfigurationService } from './services/configutarion/configutarion.service'
import { WhatsappService } from './services/whatsapp/whatsapp.service';
import { ProcessMessageUseCase } from './use-cases/process-message.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationRepository, MessagesRepository]), InfrastructureModule],
  providers: [
    ConfigurationService,
    ConversationRepository,
    MessagesRepository,
    WhatsappService,
    ProcessMessageUseCase,
  ],
  exports: [
    ConfigurationService,
    ConversationRepository,
    MessagesRepository,
    WhatsappService,
    ProcessMessageUseCase,
  ],
})
export class ApplicationModule {}
