import { Injectable,inject } from '@angular/core';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { NotificationGateway } from '@domain/notifications/gateways/notification.gateway';
import { Notification } from '@domain/notifications/models/notification.model';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService implements NotificationGateway {
    

  private readonly websocket=inject(WebSocketUseCases<Client>);
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);



  public subscribe(topic:string): void {
    this.websocket.getClient().subscribe(topic, (message: IMessage) => {
      try {
        //const notification: Notification[] = JSON.parse(message.body);
        //this.notificationsSubject.next(notification);
        console.log('Received notification: ', message);
      } catch (error) {
        console.error('Failed to parse notification message: ', message.body, error);
      }
    });
  }


  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }
    
}