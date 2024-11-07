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
import { Repository } from 'typeorm';
import { DatabaseImplementationService } from 'src/infrastructure/implementations/database.implementation.service';
import { ChatServiceImplementation } from 'src/infrastructure/implementations/chat.service.implementation';
import { IaServiceImplementation } from 'src/infrastructure/implementations/ia.service.implementation';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [
        //REVISAAAAAAR LO DEL TYPEORM MODULE ESTA TAMBIEN EN DOMAIN
        TypeOrmModule.forFeature([ConversationEntity, MessagesEntity, UserEntity, ConversationEntity]),
        InfrastructureModule,
        ConfigModule.forRoot()
    ],
    providers: [
        ConfigurationService,
        MessagesRepository,
        ConversationRepository,
        WhatsAppService,
        ProcessMessageUseCase,
        ChatFacade,
        ChatGptService,
        UserRepository,
        Repository,
        DatabaseImplementationService,
        ChatServiceImplementation,
        IaServiceImplementation,
        {
            provide: ChatGptService,
            useFactory: (configService: ConfigService) => {
              const initialPrompt = configService.get<string>('INITIAL_PROMPT');
              return new ChatGptService(initialPrompt);
            },
            inject: [ConfigService],
          },
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
        TypeOrmModule,
        Repository,
        DatabaseImplementationService,
        ChatServiceImplementation
    ],
})
export class ApplicationModule {}
