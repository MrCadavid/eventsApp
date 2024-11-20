import { CommonModule } from '@angular/common';
import { Component,inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventUseCases } from '@application/events/use-cases/event.usecases';
import { Event } from '@domain/events/models/event.model';
import { SkeletonComponent } from 'app/shared/components/skeleton/skeleton.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Observable} from 'rxjs';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, TableModule, CommonModule, ButtonModule, RouterModule, SkeletonComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent{
  private readonly events=inject(EventUseCases);
  protected events$:Observable<Event[]>=this.events.events();
}
