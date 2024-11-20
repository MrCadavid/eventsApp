import {
  Component,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';

import { environment } from '@env/environment';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    NgOptimizedImage,
  ],
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected router = inject(Router);
  onRoleSelect(role: string) {
    const user = {
      id: 1,
      name: 'ryan cadavid',
      email: 'ryan@azure.com',
      role,
      createdAt: '2024-11-19T04:38:47.27135',
    };
    if(this.isBrowser){
      localStorage.setItem(environment.userKey, JSON.stringify(user));
      this.router.navigate(['/events/list']);
    }
    
  }

  get isBrowser(){
    return typeof window!=='undefined';
  }
}
