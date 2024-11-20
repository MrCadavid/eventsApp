import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    title: 'list events',
    loadComponent: async () =>
      (await import('./list/list.component')).ListComponent,
  },
  {
    path: 'create',
    title: 'create events',
    loadComponent: async () =>
      (await import('./create/create.component')).CreateComponent,
  },
  {
    path: 'edit/:id',
    title: 'edit events',
    loadComponent: async () =>
      (await import('./edit/edit.component')).EditComponent,
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
