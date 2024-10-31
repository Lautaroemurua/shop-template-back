// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepository } from './repositories/conversation.repository';
import { UserRepository } from './repositories/user.repository'; // Asegúrate de que esta línea esté presente
import { ConfigurationService } from '../application/services/configutation/configutation.service';
import { WhatsAppService } from './services/whatsapp/whatsapp.service';
import { ProcessMessageUseCase } from './use-cases/process-message.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ChatFacade } from './facades/chat.facade';
import { ChatGptService } from './services/chatgpt/chatGpt.service';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { MessagesEntity } from 'src/domain/entities/messages.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { MessagesRepository } from './repositories/messages.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConversationEntity, MessagesEntity, UserEntity]),
        InfrastructureModule,
    ],
    providers: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ChatGptService,
        UserRepository,// Asegúrate de incluir tu repositorio aquí
    ],
    exports: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ChatGptService,
        UserRepository,
    ],
})
export class ApplicationModule {}
