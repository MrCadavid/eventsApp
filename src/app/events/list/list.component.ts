import { Component, inject, OnInit } from '@angular/core';
import { EventUseCases } from '@application/events/use-cases/event.usecases';
import { NotificationsUseCases } from '@application/websocket/use-cases/notifications.usecases';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';

import { Event } from '@domain/events/models/event.model';
import { Client } from '@stomp/stompjs';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
 
  private readonly eventsUseCases=inject(EventUseCases);
  private readonly notifications=inject(NotificationsUseCases);


  ngOnInit(): void {

    this.notifications.getNotifications().subscribe((notifications)=>{
      console.log(notifications)
    })

    this.eventsUseCases.get().subscribe((events:Event[])=>{
      console.log(events)
    })
  }


}
