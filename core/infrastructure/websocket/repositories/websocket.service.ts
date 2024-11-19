import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '@domain/notifications/models/notification.model';
import { WebSocketPort } from '@domain/websocket/models/websocket.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements WebSocketPort {

  private readonly client: Client;
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);

  constructor() {
    // Configure the STOMP client
    this.client = new Client({
      brokerURL: 'ws://localhost:8082/websocket',
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP Debug: ', str),
    });

    // Handle STOMP protocol errors
    this.client.onStompError = (error) => {
      console.error('STOMP Error: ', error);
    };

    // Activate the client
    this.client.activate();
  }
  

  /**
   * Connects to the WebSocket and sets up subscriptions.
   */
  connect(): void {
    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      this.subscribeToNotifications();
    };
  }

  /**
   * Subscribes to the notifications topic.
   */
  private subscribeToNotifications(): void {
    this.client.subscribe('/topic/notifications', (message: IMessage) => {
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

  /**
   * Disconnects from the WebSocket.
   */
  disconnect(): void {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }
}
