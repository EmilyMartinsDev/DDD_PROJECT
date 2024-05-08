import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangeEvent from "../AddressChangeEvent";


export default class AddressChangeHandle implements EventHandlerInterface<AddressChangeEvent>{
    handler(event: AddressChangeEvent): void {
       console.log(`Endereço do cliente: ${event.eventData.client_id}, ${event.eventData.client_name} alterado para: ${event.eventData.alterFor}`)
    }
    
}