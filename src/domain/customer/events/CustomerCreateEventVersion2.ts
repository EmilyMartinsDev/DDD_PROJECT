import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreateEventVersion2 implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;
    constructor(eventData:any){
        this.dataTimeOccurred = new Date()
        this.eventData = eventData
    }
}
