import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Notification } from '@domain/notifications/models/notification.model';

export abstract class EventGateway {
  abstract post(event: Event): Observable<Event>;
  abstract put(id: string, event: Event): Observable<Event>;
  abstract delete(id: string): Observable<void>;
  abstract get(): Observable<Event[]>;
  abstract getById(id: string): Observable<Event>;
  abstract events: Observable<Event[]>;
  abstract load():void;
  abstract notificationForEvent(id:string, notification:Notification):Observable<Notification>;
}
