import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '@domain/events/models/event.model';
import { EventGateway } from '@domain/events/gateways/event.gateway';
import { environment } from '@env/environment';
import { Notification } from '@domain/notifications/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class EventService implements EventGateway {

  private readonly apiUrl = `${environment.apiUrl}/api/events`;

  private readonly eventsSubject= new BehaviorSubject<Event[]>([]);

  constructor(private readonly http: HttpClient) {
    this.load();
  }

  get events():Observable<Event[]>{
    return this.eventsSubject.asObservable();
  }
  post(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  put(id: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  get(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  notificationForEvent(id:string, notification:Notification):Observable<Notification>{
    return this.http.post<Notification>(`${this.apiUrl}/${id}/notifications`, notification);
  }

  load(){
    this.get().subscribe((events)=> this.eventsSubject.next(events.reverse()))
  }
}
