import EventHandlerInterface from "../../event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{
    handler(event: ProductCreatedEvent): void {
       console.log("Send Email to....")
    }
    
}