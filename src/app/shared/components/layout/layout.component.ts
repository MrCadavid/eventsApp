import { ChangeDetectionStrategy,Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { Client } from '@stomp/stompjs';
import { NotificationsUseCases } from '@application/websocket/use-cases/notifications.usecases';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  
  private readonly websocket=inject(WebSocketUseCases<Client>);
  private readonly notifications=inject(NotificationsUseCases);
  
  ngOnInit(): void {
   this.websocket.connect();
   this.websocket.status().subscribe((status:boolean)=>status && this.notifications.subscribe())
   
   
  }
}
