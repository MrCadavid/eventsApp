import { Component, inject} from '@angular/core';
import { EventUseCases } from '@application/events/use-cases/event.usecases';
import { NotificationsUseCases } from '@application/websocket/use-cases/notifications.usecases';
import { Event } from '@domain/events/models/event.model';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent{
  private readonly eventsUseCases=inject(EventUseCases);
  private readonly notifications=inject(NotificationsUseCases);
  private readonly events$:Observable<Event[]>=this.eventsUseCases.get();
  
}
