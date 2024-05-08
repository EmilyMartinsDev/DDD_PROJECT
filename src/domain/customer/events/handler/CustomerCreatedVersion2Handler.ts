import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreateEventVersion2 from "../CustomerCreateEventVersion2";
import CustomerCreateEvent from "../CustomerCreatedEvent";


export default class CustomerCreateHandlerVersion2 implements EventHandlerInterface<CustomerCreateEventVersion2>{
    handler(event: CustomerCreateEventVersion2): void {
       console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
    
}