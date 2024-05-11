
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { IFindInputProductDTO, IFindOutputProductDTO } from "./finc.product.dto";

export class FindProductUseCase{
    private productRepository:ProductRepositoryInterface
    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository = productRepository
    }

    async execute(input: IFindInputProductDTO):Promise<IFindOutputProductDTO>{
        const product = await this.productRepository.find(input.id);
        return {
        name: product.name,
        id: product.id,
        price: product.price
        }
    }
}