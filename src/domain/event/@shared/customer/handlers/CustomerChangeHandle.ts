import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreateEvent from "../CustomerCreatedEvent";


export default class CustomerCreateHandle implements EventHandlerInterface<CustomerCreateEvent>{
    handler(event: CustomerCreateEvent): void {
       console.log(event.eventData.description)
    }
    
}