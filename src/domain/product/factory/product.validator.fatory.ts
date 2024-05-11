import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Product";
import ProductValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory{
    
    static create(): ValidatorInterface<Product>{
        return new ProductValidator()
    }
}