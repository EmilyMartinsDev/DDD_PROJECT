import { toXML } from "jstoxml";
import { IListOutputProductDTO } from "../../../usecase/product/list/list.product.dto";


export default class ProductPresenter {
  static listXML(data: IListOutputProductDTO): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          products: data.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price
          })),
        },
      },
      xmlOption
    );
  }
}