export abstract class WebSocketGateway {
  abstract connect(): void;
  abstract disconnect(): void;
}