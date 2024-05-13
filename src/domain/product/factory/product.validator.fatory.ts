import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Product";
import ProductInterface from "../entity/product.interface";
import ProductValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory{
    
    static create(): ValidatorInterface<ProductInterface>{
        return new ProductValidator()
    }
}