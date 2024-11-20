import { Injectable } from '@angular/core';
import { Client} from '@stomp/stompjs';
import { WebSocketPort } from '@domain/websocket/models/websocket.model';
import {environment} from '@env/environment';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements WebSocketPort<Client> {

  private readonly _client: Client;
  private readonly _statusSubject= new BehaviorSubject<boolean>(false);
  


  get client():Client{
    return this._client;
  }

  get status():Observable<boolean>{
    return this._statusSubject.asObservable();
  }

  setStatus(status: boolean): void {
    this._statusSubject.next(status);
  }


  get isBrowser():boolean{
    return typeof window!=='undefined'
   }


  constructor() {
    // Configure the STOMP client
    this._client = new Client({
      brokerURL: environment.websocketUrl,
      debug: (str) => console.log('STOMP Debug: ', str),
    });

    // Handle STOMP protocol errors
    this._client.onStompError = (error) => {
      console.error('STOMP Error: ', error);
      this._statusSubject.next(false)
    };

    // Activate the client
    this._client.activate();
  }


  /**
   * Connects to the WebSocket and sets up subscriptions.
   */
  connect(): void {
    if (this.isBrowser) {
      this._client.onConnect = () => {
        console.log('Connected to WebSocket');
        this._statusSubject.next(true)
      };
    }
   
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
