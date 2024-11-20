import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventUseCases } from '@application/events/use-cases/event.usecases';
import { Event } from '@domain/events/models/event.model';
import { SkeletonComponent } from 'app/shared/components/skeleton/skeleton.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { environment } from '@env/environment';
import { Observable, tap } from 'rxjs';
import { Notification } from '@domain/notifications/models/notification.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    SkeletonComponent,
    ConfirmDialogModule,
    DialogModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly events = inject(EventUseCases);
  protected events$: Observable<Event[]> = this.events.events().pipe(
    tap((data) => {
      console.log(data);
    })
  );
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  protected user = JSON.parse(localStorage.getItem(environment.userKey)!);

  protected displayNotificationDialog= false;
  protected notificationMessage = '';
  
  private selectedEventId: string | null = null;


  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este evento?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.events.delete(id).subscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El evento fue eliminado con éxito',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'La eliminación fue cancelada',
        });
      },
    });
  }

 
  notifyCitizens(eventId: string) {
    this.selectedEventId = eventId;
    this.displayNotificationDialog = true;
  }

  
  sendNotification() {
    if (this.selectedEventId && this.notificationMessage) {
      const notification: Notification = {
        message: this.notificationMessage,
        eventId: this.selectedEventId,
        sentAt: new Date().toISOString()
      };

      this.events.notificationForEvent(this.selectedEventId, notification).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Notificación Enviada',
            detail: 'La notificación fue enviada con éxito',
          });
          this.displayNotificationDialog = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo enviar la notificación',
          });
          console.error(err);
        },
      });
    }
  }
}
