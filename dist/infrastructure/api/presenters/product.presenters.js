"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jstoxml_1 = require("jstoxml");
class ProductPresenter {
    static listXML(data) {
        const xmlOption = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };
        return (0, jstoxml_1.toXML)({
            products: {
                products: data.products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                })),
            },
        }, xmlOption);
    }
}
exports.default = ProductPresenter;
