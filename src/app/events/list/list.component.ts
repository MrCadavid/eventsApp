import { Component, inject, OnInit } from '@angular/core';
import { EventUseCases } from '@application/events/use-cases/event.usecases';

import { Event } from '@domain/events/models/event.model';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
 

  private readonly eventsUseCases=inject(EventUseCases);


  ngOnInit(): void {
    this.eventsUseCases.get().subscribe((events:Event[])=>{
      console.log(events)
    })
  }


}
