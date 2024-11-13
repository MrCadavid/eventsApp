// src/app/infrastructure/events/repositories/event.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '@domain/events/models/event.model';
import { EventGateway } from '@domain/events/gateways/event.gateway';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService implements EventGateway {

  private apiUrl = `${environment.apiUrl}/api/events`;

  constructor(private http: HttpClient) {}

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
}
