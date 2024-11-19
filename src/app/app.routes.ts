import { Routes } from '@angular/router';
import {AuthGuard} from '@application/auth/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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

    ],
  },

  {
    path: 'auth',
    loadChildren: async () => (await import('./auth')).routes,
  },


  
];
