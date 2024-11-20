import { Observable } from "rxjs";
import { Notification } from "../models/notification.model";

export abstract class NotificationGateway{
    abstract subscribe(topic:string):void;
    abstract getNotifications():Observable<Notification[]>;
    abstract getNotification():Observable<Notification>
}