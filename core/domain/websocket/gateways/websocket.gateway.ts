import { Observable} from "rxjs";

export abstract class WebSocketGateway<T> {
  abstract connect(): void;
  abstract disconnect(): void;
  abstract client:T;
  abstract status:Observable<boolean>;
  abstract setStatus(status:boolean):void;
}