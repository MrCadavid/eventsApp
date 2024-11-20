import { Injectable } from '@angular/core';
import { NotificationGateway } from '@domain/notifications/gateways/notification.gateway';
import { Notification } from '@domain/notifications/models/notification.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsUseCases {
    constructor(private readonly notificationGateway:NotificationGateway) { }

    subscribe(){
        this.notificationGateway.subscribe('/topic/notifications');
    }

    getNotifications():Observable<Notification[]>{
        return this.notificationGateway.getNotifications()
    }

    getNotification():Observable<Notification>{
        return this.notificationGateway.getNotification()
    }   
}