// src/presentation/presentation.module.ts
import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { WhatsAppController } from './whatsapp/whatsapp.controller';

@Module({
    imports: [ApplicationModule], // Asegúrate de que ApplicationModule esté importado aquí
    controllers: [WhatsAppController],
})
export class PresentationModule {}
