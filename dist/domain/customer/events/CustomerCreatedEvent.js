"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerCreateEvent {
    constructor(eventData) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = CustomerCreateEvent;
