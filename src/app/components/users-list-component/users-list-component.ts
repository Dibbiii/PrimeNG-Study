import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-users-list-component',
  standalone: true,
  imports: [CommonModule, PrimeTemplate, TableModule, TagModule, ButtonModule],
  templateUrl: './users-list-component.html',
  styleUrl: './users-list-component.scss',
})
export class UsersListComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Maria Boh',
      email: 'maria@example.com',
      role: 'user',
      active: false,
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      active: false,
    },
    {
      id: 3,
      name: 'Sissi',
      email: 'sissi@example.com',
      role: 'user',
      active: true,
    },
    {
      id: 4,
      name: 'Eleonora Caroli',
      email: 'eleonora@example.com',
      role: 'user',
      active: true,
    },

    {
      id: 5,
      name: 'Alessandra Di Bella',
      email: 'alessandra@example.com',
      role: 'admin',
      active: true,
    },
  ];

  editUser(user: string) {
    alert('Modifica utente: ' + user);
  }
}
