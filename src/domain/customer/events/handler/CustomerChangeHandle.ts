import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreateEvent from "../CustomerCreatedEvent";


export default class CustomerCreateHandle implements EventHandlerInterface<CustomerCreateEvent>{
    handler(event: CustomerCreateEvent): void {
       console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
    
}