// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './repositories/messages.repository';
import { ConversationRepository } from './repositories/conversation.repository';
import { ConfigurationService } from '../application/services/configutation/configutation.service';
import { WhatsAppService } from './services/whatsapp/whatsapp.service';
import { ProcessMessageUseCase } from './use-cases/process-message.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ChatFacade } from './facades/chat.facade';

@Module({
    imports: [TypeOrmModule.forFeature([ConversationRepository, MessagesRepository]), InfrastructureModule],
    providers: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService, // Asegúrate de que WhatsAppService esté aquí
        ProcessMessageUseCase,
        ChatFacade
    ],
    exports: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService, // Exporta WhatsAppService
        ProcessMessageUseCase,
        ChatFacade
    ],
})
export class ApplicationModule {}
