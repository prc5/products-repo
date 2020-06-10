import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  getProducts(user: User): Promise<Product[]> {
    return this.productRepository.getProducts(user);
  }

  async getProductById(productId: string, user: User): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId, userId: user.id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, user);
  }

  async updateProduct(
    productId: string,
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.updateProduct(
      productId,
      createProductDto,
      user,
    );
  }

  async deleteProduct(productId: string, user: User): Promise<void> {
    const result = await this.productRepository.delete({
      id: productId,
      userId: user.id,
    });

    if (!result.affected) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
  }
}
