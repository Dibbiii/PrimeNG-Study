import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form-component/user-form-component';
import { UsersListComponent } from './components/users-list-component/users-list-component';
import { FlightSearchComponent } from './components/flight-search-component/flight-search-component';
import { ServerTableComponent } from './components/server-table-component/server-table-component';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users/form',
    component: UserFormComponent,
  },
  {
    path: 'users/list',
    component: UsersListComponent,
  },
  {
    path: 'flights',
    component: FlightSearchComponent,
  },
  {
    path: 'table/paginated',
    component: ServerTableComponent,
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
  }
];
