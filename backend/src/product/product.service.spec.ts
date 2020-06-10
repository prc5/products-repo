import { Test, TestingModule } from '@nestjs/testing';

import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';

const mockUser = {
  id: 'test_id_123',
  login: 'test_login',
  name: 'Maciej',
  surname: 'Pyrc',
};

const mockProductRepository = () => ({
  getProducts: jest.fn(),
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
});

describe('ProductService', () => {
  let service: ProductService;
  let productRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useFactory: mockProductRepository },
      ],
    }).compile();

    service = await module.get<ProductService>(ProductService);
    productRepository = await module.get<ProductRepository>(ProductRepository);
  });

  describe('getProducts', () => {
    it('gets all products related to user from the repository', async () => {
      const testedValue = 'someValue';
      productRepository.getProducts.mockResolvedValue(testedValue);
      expect(productRepository.getProducts).not.toHaveBeenCalled();
      const result = await productRepository.getProducts(mockUser);
      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual(testedValue);
    });
  });

  describe('createProduct', () => {
    it('allows to create product and return the result', async () => {
      const testedValue = 'someValue';
      productRepository.createProduct.mockResolvedValue(testedValue);
      expect(productRepository.createProduct).not.toHaveBeenCalled();
      const createProductDto: CreateProductDto = {
        name: 'test_name',
        description: 'test_description',
        quantity: 2,
        price: 10,
      };
      const result = await productRepository.createProduct(
        createProductDto,
        mockUser,
      );
      expect(productRepository.createProduct).toHaveBeenCalledWith(
        createProductDto,
        mockUser,
      );
      expect(result).toEqual(testedValue);
    });
  });

  describe('deleteProduct', () => {
    it('allows to delete product related to user', async () => {
      const id = 1;
      const testedValue = { affected: 1 };
      productRepository.deleteProduct.mockResolvedValue(testedValue);
      expect(productRepository.deleteProduct).not.toHaveBeenCalled();
      const result = await productRepository.deleteProduct(id, mockUser);
      expect(productRepository.deleteProduct).toHaveBeenCalledWith(
        id,
        mockUser,
      );
      expect(result).toEqual(testedValue);
    });

    it('throws an error as product could not be found', async () => {
      const id = 1;
      const testedValue = { affected: 0 };
      productRepository.deleteProduct.mockResolvedValue(testedValue);
      expect(productRepository.deleteProduct(id, mockUser)).rejects.toThrow();
    });
  });
});
