"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SendEmailWhenProductIsCreatedHandler_1 = __importDefault(require("../../product/events/handler/SendEmailWhenProductIsCreatedHandler"));
const product_created_event_1 = __importDefault(require("../../product/events/product-created.event"));
const CustomerCreatedEvent_1 = __importDefault(require("../../customer/events/CustomerCreatedEvent"));
const AddressChangeHandle_1 = __importDefault(require("../../customer/events/handler/AddressChangeHandle"));
const CustomerChangeHandle_1 = __importDefault(require("../../customer/events/handler/CustomerChangeHandle"));
const event_dispatcher_1 = __importDefault(require("./event-dispatcher"));
const CustomerCreatedVersion2Handler_1 = __importDefault(require("../../customer/events/handler/CustomerCreatedVersion2Handler"));
const AddressChangeHandle_2 = __importDefault(require("../../customer/events/handler/AddressChangeHandle"));
const AddressChangeEvent_1 = __importDefault(require("../../customer/events/AddressChangeEvent"));
describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler_1.default();
        const createUserHandle = new CustomerChangeHandle_1.default();
        const createUserHandleVersion2 = new CustomerCreatedVersion2Handler_1.default();
        const changeAddressCustomer = new AddressChangeHandle_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEventVersion2", createUserHandleVersion2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"][0]).toMatchObject(changeAddressCustomer);
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(createUserHandle);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"][0]).toMatchObject(createUserHandleVersion2);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"].length).toBe(1);
    });
    it("should unregister an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler_1.default();
        const createUserHandle = new CustomerChangeHandle_1.default();
        const createUserHandleVersion2 = new CustomerCreatedVersion2Handler_1.default();
        const changeAddressCustomer = new AddressChangeHandle_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEventVersion2", createUserHandleVersion2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(createUserHandle);
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"][0]).toMatchObject(changeAddressCustomer);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"][0]).toMatchObject(createUserHandleVersion2);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.unregister("CustomerCreateEvent", createUserHandle);
        eventDispatcher.unregister("CustomerCreateEventVersion2", createUserHandleVersion2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressCustomerChange"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"].length).toBe(0);
    });
    it("should notify all event handlers", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler_1.default();
        const createUserHandle = new CustomerChangeHandle_1.default();
        const createUserHandleVersion2 = new CustomerCreatedVersion2Handler_1.default();
        const changeAddressCustomer = new AddressChangeHandle_2.default();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");
        const spyEventHandler2 = jest.spyOn(createUserHandle, "handler");
        const spyEventHandler3 = jest.spyOn(createUserHandleVersion2, "handler");
        const spyEventHandler4 = jest.spyOn(changeAddressCustomer, "handler");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressChangeCustomerEvent", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEvent", createUserHandleVersion2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(createUserHandle);
        expect(eventDispatcher.getEventHandlers["AddressChangeCustomerEvent"][0]).toMatchObject(changeAddressCustomer);
        expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][1]).toMatchObject(createUserHandleVersion2);
        const productCreatedEvent = new product_created_event_1.default({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });
        const customerCreatedEvent = new CustomerCreatedEvent_1.default({});
        const customerCreatedEvent2 = new CustomerCreatedEvent_1.default({});
        const addressChangeEvent = new AddressChangeEvent_1.default({
            client_id: "1",
            client_name: "Emily",
            alterFor: "Mer novo endereco",
        });
        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent2);
        eventDispatcher.notify(addressChangeEvent);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyEventHandler3).toHaveBeenCalled();
        expect(spyEventHandler4).toHaveBeenCalled();
    });
});
