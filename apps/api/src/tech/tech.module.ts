import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminTechController, TechIconsController, TechStackController } from './tech.controller';
import { TechService } from './tech.service';

@Module({
  imports: [AuthModule],
  controllers: [TechStackController, TechIconsController, AdminTechController],
  providers: [TechService],
  exports: [TechService],
})
export class TechModule {}
