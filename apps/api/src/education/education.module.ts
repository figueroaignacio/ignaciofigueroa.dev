import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminEducationController, EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  imports: [AuthModule],
  controllers: [EducationController, AdminEducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
