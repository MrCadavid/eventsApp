import { Injectable } from '@angular/core';
import { WebSocketGateway } from '../../../domain/websocket/gateways/websocket.gateway';




@Injectable({
  providedIn: 'root',
})
export class WebSocketUseCases {
  constructor(private readonly websocketGateway: WebSocketGateway) {}

  connect(): void{
    this.websocketGateway.connect();
  }

  disconnect():void{
    return this.websocketGateway.disconnect();
  }
}
