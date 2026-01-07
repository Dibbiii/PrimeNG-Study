import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { UsersListComponent } from './components/users-list-component/users-list-component';
import { FlightSearchComponent } from './components/flight-search-component/flight-search-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users/form',
    component: UserFormComponent
  },
  {
    path: 'users/list',
    component: UsersListComponent
  },
  {
    path: 'flights',
    component: FlightSearchComponent
  }
];
