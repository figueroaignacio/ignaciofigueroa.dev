import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminExperiencesController, ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [AuthModule],
  controllers: [ExperiencesController, AdminExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
