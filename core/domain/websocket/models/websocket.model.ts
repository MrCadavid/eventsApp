export interface WebSocketPort<T>{
    connect(): void;
    disconnect(): void;
    client:T
}
  