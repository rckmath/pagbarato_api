import { ProductUnitType } from '../product.enum';
import { IProduct } from '../product.interface';

export default class ProductDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unit: ProductUnitType,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date
  ) {}

  static from(product: IProduct) {
    return new ProductDto(product.id, product.name, product.unit, product.createdAt, product.updatedAt);
  }

  static fromMany(products: Array<IProduct>) {
    return products.map((product) => ProductDto.from(product));
  }
}
