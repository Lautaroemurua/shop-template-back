// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './repositories/messages.repository';
import { ConversationRepository } from './repositories/conversation.repository';
import { UserRepository } from './repositories/user.repository'; // Asegúrate de que esta línea esté presente
import { ConfigurationService } from '../application/services/configutation/configutation.service';
import { WhatsAppService } from './services/whatsapp/whatsapp.service';
import { ProcessMessageUseCase } from './use-cases/process-message.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ChatFacade } from './facades/chat.facade';
import { ConversationService } from './services/conversation/conversation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConversationRepository, MessagesRepository, UserRepository]),
        InfrastructureModule,
    ],
    providers: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ConversationService,
    ],
    exports: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ConversationService, // Asegúrate de que ConversationService esté exportado
    ],
})
export class ApplicationModule {}
