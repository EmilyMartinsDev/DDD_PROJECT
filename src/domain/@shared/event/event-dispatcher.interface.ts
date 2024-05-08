import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatchInterface{
    notify(event:EventInterface):void;
    register(eventname:string, handler:EventHandlerInterface):void;
    unregister(eventname:string, handler:EventHandlerInterface):void;
    unregisterAll():void;
}