"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressChangeHandle {
    handler(event) {
        console.log(`Endereço do cliente: ${event.eventData.client_id}, ${event.eventData.client_name} alterado para: ${event.eventData.alterFor}`);
    }
}
exports.default = AddressChangeHandle;
