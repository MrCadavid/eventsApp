import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Event } from '@domain/events/models/event.model';
import { EventGateway } from '@domain/events/gateways/event.gateway';

@Injectable({
  providedIn: 'root',
})
export class EventUseCases {
  constructor(private readonly eventGateway: EventGateway) {}

  post(event: Event): Observable<Event> {
    return this.eventGateway.post(event);
  }

  put(id: string, event: Event): Observable<Event> {
    return this.eventGateway.put(id, event);
  }

  delete(id: string): Observable<void> {
    return this.eventGateway.delete(id);
  }

  get(): Observable<Event[]> {
    return this.eventGateway.get();
  }

  getById(id: string): Observable<Event> {
    return this.eventGateway.getById(id);
  }

  events(): Observable<Event[]> {
    return this.eventGateway.events;
  }

  load():void{
    this.eventGateway.load();
  }
}
