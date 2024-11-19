export abstract class WebSocketGateway<T> {
  abstract connect(): void;
  abstract disconnect(): void;
  abstract client:T
}