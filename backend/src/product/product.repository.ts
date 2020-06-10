import { Repository, EntityRepository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../user/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(user): Promise<Product[]> {
    const products = await this.find({ userId: user.id });

    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, description, price, quantity } = createProductDto;

    const product = new Product();

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.user = user;

    await product.save();

    return product;
  }

  async updateProduct(
    productId: string,
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, description, price, quantity } = createProductDto;

    const product = await this.findOne({ id: productId, userId: user.id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await product.save();

    return product;
  }
}
