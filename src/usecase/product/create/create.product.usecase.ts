import Product from "../../../domain/product/entity/Product";
import ProductFactory from "../../../domain/product/factory/product.fatory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { ICreateInputProductDTO, ICreateOutputProductDTO } from "./create.product.dto";

export default class CreateProductUseCase{
    private productRepository : ProductRepositoryInterface
    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository = productRepository
    }

    async execute(input:ICreateInputProductDTO):Promise<ICreateOutputProductDTO>{
        const Instanceproduct = ProductFactory.create(input.type, input.name, input.price);
        await this.productRepository.create(new Product(Instanceproduct.id, Instanceproduct.name, Instanceproduct.price));
        
         return {
            id: Instanceproduct.id,
            name: Instanceproduct.name,
            price: Instanceproduct.price
         }
    }
}