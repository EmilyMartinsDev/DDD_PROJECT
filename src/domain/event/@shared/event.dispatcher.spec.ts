import AddressChangeEvent from "./customer/AddressChangeEvent";
import CustomerCreateEvent from "./customer/CustomerCreatedEvent";
import AddressChangeHanfle from "./customer/handlers/AddressChangeHandle";
import CustomerCreateHandle from "./customer/handlers/CustomerChangeHandle";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/SendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events tests", ()=>{
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const changeAddressCustomer = new AddressChangeHanfle();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
          
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
          ).toMatchObject(eventHandler);
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            1
          );

          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"][0]
          ).toMatchObject(changeAddressCustomer);
          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["AddressCustomerChange"].length).toBe(
            1
          );

          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
          ).toMatchObject(createUserHandle);
          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"].length).toBe(
            1
          );
    
      });

      it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const changeAddressCustomer = new AddressChangeHanfle();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
          
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
          ).toMatchObject(createUserHandle);

          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"][0]
          ).toMatchObject(changeAddressCustomer);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.unregister("CustomerCreateEvent", createUserHandle);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
          0
        );

        expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["AddressCustomerChange"].length).toBe(
            0
          );

          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"].length).toBe(
            0
          );
      });

      it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const changeAddressCustomer = new AddressChangeHanfle();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
          
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
          ).toMatchObject(createUserHandle);

          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"][0]
          ).toMatchObject(changeAddressCustomer);
    
        eventDispatcher.unregisterAll();
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]

        ).toBeUndefined();

        expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"]
  
          ).toBeUndefined();
          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"]
    
          ).toBeUndefined();
    
      });

   
      it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const changeAddressCustomer = new AddressChangeHanfle();

        const spyEventHandler = jest.spyOn(eventHandler, "handler");
        const spyEventHandler2 = jest.spyOn(createUserHandle, "handler");
        const spyEventHandler3 = jest.spyOn(changeAddressCustomer, "handler");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
          ).toMatchObject(eventHandler);
      
          expect(
              eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
            ).toMatchObject(createUserHandle);
  
            expect(
              eventDispatcher.getEventHandlers["AddressCustomerChange"][0]
            ).toMatchObject(changeAddressCustomer);
    
        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 10.0,
        });

        const customerCreatedEvent = new CustomerCreateEvent({
            description: "Esse é o primeiro console.log do evento: CustomerCreated"
          });
          const customerCreatedEvent2 = new CustomerCreateEvent({
            description: "Esse é o segundo console.log do evento: CustomerCreated"
          });
          const addressChangeEvent = new AddressChangeEvent({
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
        
        expect(spyEventHandler).toHaveBeenCalled();
      });
});