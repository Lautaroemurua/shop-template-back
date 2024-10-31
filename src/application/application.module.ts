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
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { MessagesEntity } from 'src/domain/entities/messages.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

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
        ConversationService,
        UserRepository, // Asegúrate de incluir tu repositorio aquí
    ],
    exports: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ConversationService,
        UserRepository,
    ],
})
export class ApplicationModule {}
