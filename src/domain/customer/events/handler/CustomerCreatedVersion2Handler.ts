import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreateEvent from "../CustomerCreatedEvent";


export default class CustomerCreateHandlerVersion2 implements EventHandlerInterface<CustomerCreateEvent>{
    handler(event: CustomerCreateEvent): void {
       console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
    
}