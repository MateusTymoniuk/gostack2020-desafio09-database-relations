import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const foundProducts = await this.productsRepository.findAllById(products);

    if (!foundProducts) {
      throw new AppError('Products doesnt exist');
    }

    const updatedProducts = foundProducts.map(product => {
      const orderQuantity = products.find(el => product.id === el.id)?.quantity;
      if (!orderQuantity) {
        throw new AppError('Product without quantity not allowed');
      }
      const updatedQuantity = product.quantity - orderQuantity;
      if (updatedQuantity < 0) {
        throw new AppError(`Quantity not allowed for product ${product.name}`);
      }
      return {
        ...product,
        quantity: updatedQuantity,
      };
    });

    await this.productsRepository.updateQuantity(updatedProducts);

    const orderProducts = products.map(product => {
      const price = foundProducts.find(el => product.id === el.id)?.price;

      if (!price) {
        throw new AppError(`Cannot find price for ${product.id}`);
      }

      return {
        product_id: product.id,
        quantity: product.quantity,
        price,
      };
    });

    const order = await this.ordersRepository.create({
      customer,
      products: orderProducts,
    });

    return order;
  }
}

export default CreateOrderService;
