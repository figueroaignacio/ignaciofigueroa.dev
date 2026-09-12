import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import {
  AdminTaxonomiesController,
  ProjectCategoriesController,
  ProjectLabelsController,
} from './taxonomies.controller';
import { TaxonomiesService } from './taxonomies.service';

@Module({
  imports: [AuthModule],
  controllers: [ProjectCategoriesController, ProjectLabelsController, AdminTaxonomiesController],
  providers: [TaxonomiesService],
  exports: [TaxonomiesService],
})
export class TaxonomiesModule {}
