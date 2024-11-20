import { Observable } from "rxjs";

export interface WebSocketPort<T>{
    connect(): void;
    disconnect(): void;
    client:T;
    status:Observable<boolean>;
    setStatus(status:boolean):void;

}
  