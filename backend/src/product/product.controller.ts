import {
  Controller,
  Put,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from './product.service';
import { GetUser } from '../../utils/get-user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../user/user.entity';
import { Product } from './product.entity';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(@GetUser() user: User): Promise<Product[]> {
    return this.productService.getProducts(user);
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.getProductById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, user);
  }

  @Put('/:productId')
  updateProductStatus(
    @Param('productId') productId: string,
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, createProductDto, user);
  }

  @Delete('/:productId')
  deleteProduct(
    @Param('productId') productId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productService.deleteProduct(productId, user);
  }
}
