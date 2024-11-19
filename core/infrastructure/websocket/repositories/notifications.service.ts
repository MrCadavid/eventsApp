import { Injectable,Inject } from '@angular/core';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { NotificationGateway } from '@domain/notifications/gateways/notification.gateway';
import { Notification } from '@domain/notifications/models/notification.model';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService implements NotificationGateway {
    

  private readonly websocket=Inject(WebSocketUseCases<Client>);
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);



  public subscribe(topic:string): void {
    console.log(this.websocket.Client)
  }


  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }
    
}