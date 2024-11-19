import { Injectable,Inject } from '@angular/core';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService {
    

    private readonly websocket=Inject(WebSocketUseCases<Client>);
    private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);


    
    /**
   * Subscribes to the notifications topic.
   */
  private subscribeToNotifications(): void {
    this.websocket.client.subscribe('/topic/notifications', (message: IMessage) => {
      try {
        const notification: Notification[] = JSON.parse(message.body); // Parse the incoming message
        this.notificationsSubject.next(notification); // Emit the new notifications
        console.log('Received notification: ', notification);
      } catch (error) {
        console.error('Failed to parse notification message: ', message.body, error);
      }
    });
  }

  /**
   * Returns an Observable of notifications.
   */
  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }
    
}