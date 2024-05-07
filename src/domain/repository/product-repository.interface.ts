import Product from "../entity/Product";
import Repository from "./repository.interface";

export default interface ProductRepositoryInterface extends Repository<Product>{}