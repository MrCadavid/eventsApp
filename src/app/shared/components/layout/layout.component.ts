import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { WebSocketUseCases } from '@application/websocket/use-cases/websocket.usecases';
import { Client } from '@stomp/stompjs';
import { NotificationsUseCases } from '@application/websocket/use-cases/notifications.usecases';
import { Notification } from '@domain/notifications/models/notification.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EventUseCases } from '@application/events/use-cases/event.usecases';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, ToastModule],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `,
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly websocket = inject(WebSocketUseCases<Client>);
  private readonly notifications = inject(NotificationsUseCases);
  private readonly events = inject(EventUseCases);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.websocket.connect();
    this.websocket
      .status()
      .subscribe((status: boolean) => status && this.notifications.subscribe());
    this.listenToNotifications();
  }

  private listenToNotifications(): void {
    this.notifications
      .getNotification()
      .subscribe((notification: Notification) => {
        this.events.load();
        this.messageService.add({
          severity: 'info',
          summary: 'Nueva Notificación',
          detail: notification.message,
          life: 5000,
        });
      });
  }

  ngOnDestroy(): void {
    this.websocket.disconnect();
    this.websocket.setstatus(false);
  }
}
