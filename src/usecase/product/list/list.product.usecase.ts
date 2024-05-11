import Product from "../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { IListOutputProductDTO } from "./list.product.dto";



export default class ListProductUseCase{
    private productRepository:ProductRepositoryInterface
    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository = productRepository
    }

    async execute(){
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }

    
}

class OutputMapper {
    static toOutput(product: Product[]): IListOutputProductDTO {
      return {
        products: product.map(product=>({
            name: product.name,
            price: product.price,
            id: product.id
        }))
      };
    }
}