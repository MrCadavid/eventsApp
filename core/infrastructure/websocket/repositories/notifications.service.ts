import { Injectable,inject } from '@angular/core';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { NotificationGateway } from '@domain/notifications/gateways/notification.gateway';
import { Notification } from '@domain/notifications/models/notification.model';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService implements NotificationGateway {
    
  
  private readonly websocket=inject(WebSocketUseCases<Client>);
  private readonly notificationSubject = new Subject<Notification>();
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);



  public subscribe(topic:string): void {
    this.websocket.getClient().subscribe(topic, (message: IMessage) => {
      try {
        const notification: Notification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
        this.updateNotifications(notification);
      } catch (error) {
        console.error('Failed to parse notification message: ', message.body, error);
      }
    });
  }

  updateNotifications(notification:Notification){
    const currentNotifications = this.notificationsSubject.getValue();
    const updatedNotifications = [...currentNotifications, notification];
    this.notificationsSubject.next(updatedNotifications)
  }


  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  getNotification(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }
    
}