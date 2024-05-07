import EventInterface from "../event.interface";

export default class AddressChangeEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;
    constructor(eventData:any){
        this.dataTimeOccurred = new Date()
        this.eventData = eventData
    }
}