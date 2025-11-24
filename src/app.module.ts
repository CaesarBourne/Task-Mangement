import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './infrastructure/db/typeorm.config';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    InfrastructureModule,
    PresentationModule,
  ],
})
export class AppModule {}