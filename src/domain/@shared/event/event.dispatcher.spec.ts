import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/SendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../../product/events/product-created.event";
import CustomerCreateEvent from "../../customer/events/CustomerCreatedEvent";
import AddressChangeHanfle from "../../customer/events/handler/AddressChangeHandle";
import CustomerCreateHandle from "../../customer/events/handler/CustomerChangeHandle";
import EventDispatcher from "./event-dispatcher";
import CustomerCreateHandlerVersion2 from "../../customer/events/handler/CustomerCreatedVersion2Handler";
import CustomerCreateEventVersion2 from "../../customer/events/CustomerCreateEventVersion2";
import AddressChangeHandle from "../../customer/events/handler/AddressChangeHandle";
import AddressChangeCustomerEvent from "../../customer/events/AddressChangeEvent";


describe("Domain events tests", ()=>{
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const createUserHandleVersion2 = new CustomerCreateHandlerVersion2();
        const changeAddressCustomer = new AddressChangeHanfle();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEventVersion2", createUserHandleVersion2);
          
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

          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"][0]
          ).toMatchObject(createUserHandleVersion2);
          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"]
          ).toBeDefined();
          expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"].length).toBe(
            1
          );
    
      });

      it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const createUserHandleVersion2 = new CustomerCreateHandlerVersion2();
        const changeAddressCustomer = new AddressChangeHanfle();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEventVersion2", createUserHandleVersion2);
          
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    
        expect(
            eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
          ).toMatchObject(createUserHandle);

          expect(
            eventDispatcher.getEventHandlers["AddressCustomerChange"][0]
          ).toMatchObject(changeAddressCustomer);

          expect(
            eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"][0]
          ).toMatchObject(createUserHandleVersion2);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("AddressCustomerChange", changeAddressCustomer);
        eventDispatcher.unregister("CustomerCreateEvent", createUserHandle);
        eventDispatcher.unregister("CustomerCreateEventVersion2", createUserHandleVersion2);

        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
          0
        );
        expect(
          eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"].length).toBe(
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

   
      it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const createUserHandle = new CustomerCreateHandle();
        const createUserHandleVersion2 = new CustomerCreateHandlerVersion2();
        const changeAddressCustomer = new AddressChangeHandle();

        const spyEventHandler = jest.spyOn(eventHandler, "handler");
        const spyEventHandler2 = jest.spyOn(createUserHandle, "handler");
        const spyEventHandler3 = jest.spyOn(createUserHandleVersion2, "handler");
        const spyEventHandler4 = jest.spyOn(changeAddressCustomer, "handler");


        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreateEvent", createUserHandle);
        eventDispatcher.register("AddressChangeCustomerEvent", changeAddressCustomer);
        eventDispatcher.register("CustomerCreateEventVersion2", createUserHandleVersion2);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
          ).toMatchObject(eventHandler);
      
          expect(
              eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]
            ).toMatchObject(createUserHandle);
  
            expect(
              eventDispatcher.getEventHandlers["AddressChangeCustomerEvent"][0]
            ).toMatchObject(changeAddressCustomer);
            
            expect(
              eventDispatcher.getEventHandlers["CustomerCreateEventVersion2"][0]
            ).toMatchObject(createUserHandleVersion2);
  
        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 10.0,
        });

        const customerCreatedEvent = new CustomerCreateEvent({
           
          });
          const customerCreatedEvent2 = new CustomerCreateEventVersion2({
           
          });
          const addressChangeEvent = new AddressChangeCustomerEvent({
          
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