"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddressChangeCustomerEvent {
    constructor(eventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = AddressChangeCustomerEvent;
