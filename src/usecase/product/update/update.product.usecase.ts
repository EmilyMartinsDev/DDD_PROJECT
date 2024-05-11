import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { IOutputCreateCustomerDTO } from "../../customer/create/create.customer.dto";
import { IUpdateOutputProductDTO, IUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: IUpdateProductDTO
  ): Promise<IUpdateOutputProductDTO> {
    const product = await this.productRepository.find(input.id);
    
    console.log("AAAAAAAAAAAAAAAAAAAAAA")

    console.log(product)
    await this.productRepository.update(product);

    return {
      id: input.id,
      name: input.name,
        price: input.price
    };
  }
}