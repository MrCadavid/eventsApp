import { Injectable } from '@angular/core';
import { Client} from '@stomp/stompjs';
import { WebSocketPort } from '@domain/websocket/models/websocket.model';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements WebSocketPort<Client> {

  private readonly _client: Client;

  get client():Client{
    return this._client;
  }


  constructor() {
    // Configure the STOMP client
    this._client = new Client({
      brokerURL: environment.websocketUrl,
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP Debug: ', str),
    });

    // Handle STOMP protocol errors
    this._client.onStompError = (error) => {
      console.error('STOMP Error: ', error);
    };

    // Activate the client
    this._client.activate();
  }


  /**
   * Connects to the WebSocket and sets up subscriptions.
   */
  connect(): void {
    this._client.onConnect = () => {
      console.log('Connected to WebSocket');
    };
  }

  

  /**
   * Disconnects from the WebSocket.
   */
  disconnect(): void {
    if (this._client && this._client.connected) {
      this._client.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }
}
