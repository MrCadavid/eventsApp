import { Injectable } from '@angular/core';
import { WebSocketGateway } from '../../../domain/websocket/gateways/websocket.gateway';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WebSocketUseCases<T> {
  constructor(private readonly websocketGateway: WebSocketGateway<T>) {}

  connect(): void{
    this.websocketGateway.connect();
  }

  disconnect():void{
    return this.websocketGateway.disconnect();
  }

  getClient(){
    return this.websocketGateway.client;
  }

  status():Observable<boolean>{
    return this.websocketGateway.status;
  }
}
