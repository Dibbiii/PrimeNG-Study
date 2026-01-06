import { Routes } from '@angular/router';
import { UsersComponent } from './components/users-component/users-component';
import { UserFormComponent } from './components/user-form-component/user-form-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserFormComponent,
  },
];
