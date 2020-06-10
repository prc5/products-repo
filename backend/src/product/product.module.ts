import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
