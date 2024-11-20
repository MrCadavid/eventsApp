import { CommonModule } from '@angular/common';
import { Component,inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventUseCases } from '@application/events/use-cases/event.usecases';
import { Event } from '@domain/events/models/event.model';
import { SkeletonComponent } from 'app/shared/components/skeleton/skeleton.component';
import { ConfirmationService,MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import {environment} from '@env/environment';
import { Observable} from 'rxjs';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, TableModule, CommonModule, ButtonModule, RouterModule, SkeletonComponent,ConfirmDialogModule],
  providers:[ConfirmationService, MessageService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent{
  private readonly events=inject(EventUseCases);
  protected events$:Observable<Event[]>=this.events.events();
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);




  confirmDelete(id: string) {

    const user=localStorage.getItem(environment.tokenKey);
    if (user) {
      const isAdmin=JSON.parse(user).role;
      if (isAdmin=='administrator') {
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

     
      

      
    }

    

   
  }
}
