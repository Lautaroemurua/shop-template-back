// src/app.module.ts
import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    PresentationModule,
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
  ],
})
export class AppModule {}
