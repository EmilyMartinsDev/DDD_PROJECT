"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jstoxml_1 = require("jstoxml");
class CustomerPresenter {
    static listXML(data) {
        const xmlOption = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };
        return (0, jstoxml_1.toXML)({
            customers: {
                customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city,
                    },
                })),
            },
        }, xmlOption);
    }
}
exports.default = CustomerPresenter;
