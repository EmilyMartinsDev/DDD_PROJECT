import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Product";
import * as yup from "yup";

export default class ProductValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
      try {
        yup.object().shape({
          price: yup.number().required("Price must be greater than zero").min(0, "Price must be greater than zero"),
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required")
        }).validateSync(entity, { abortEarly: false });
      } catch (errors) {
        const e = errors as yup.ValidationError;
        e.errors.forEach((error) => {
          entity.notification.addError({
            context: "product",
            message: error,
          });
        });
      }
    }
  }
  