import { Routes } from '@angular/router';
import {AuthGuard} from '@application/auth/guards/auth.guard';
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () => (await import('./auth')).routes,
  },
  {
    path: 'events',
    loadChildren: async () => (await import('./events')).routes,
    canActivate: [AuthGuard],
    
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  }
];
