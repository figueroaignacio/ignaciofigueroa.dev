import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminTestimonialsController, TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';

@Module({
  imports: [AuthModule],
  controllers: [TestimonialsController, AdminTestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
