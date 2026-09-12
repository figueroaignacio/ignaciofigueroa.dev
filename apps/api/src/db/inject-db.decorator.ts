import { Inject } from '@nestjs/common';
import { DATABASE } from './db.module';

export const InjectDb = () => Inject(DATABASE);
