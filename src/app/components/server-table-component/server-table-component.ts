import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PrimeTemplate } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-server-table-component',
  standalone: true,
  imports: [ButtonModule, TableModule, TagModule, PrimeTemplate, CommonModule],
  templateUrl: './server-table-component.html',
  styleUrl: './server-table-component.scss',
})
export class ServerTableComponent implements OnInit {
  users: User[] = [];
  allUsersFromDatabase: User[] = [];
  totalRecords: number = 0;
  isLoading: boolean = false;

  ngOnInit(): void {
    // Usa Array.from per generare 100 elementi
    this.allUsersFromDatabase = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      name: `Utente ${i}`,
      email: `user${i}@test.com`,
      role: i % 2 === 0 ? 'Admin' : 'User',
      active: true,
    }));

    this.totalRecords = this.allUsersFromDatabase.length;
    this.isLoading = true;
  }

  loadUsers(event: TableLazyLoadEvent) {
    this.isLoading = true;
    setTimeout(() => {
      let data = [...this.allUsersFromDatabase];
      //[...] Prende tutti gli elementi dell'array originale e li "spalma" dentro un **nuovo** array.
      // Senza i puntini data non sarebbe un nuovo array, ma solo un "soprannome" (riferimento) per
      // l'array originale. Se ordino `data`, modifico direttamente anche `allUsersFromDatabase`
      if (event.sortField) {
        //event.sortField è il nome della colonna (nome o email)
        data.sort((data1: any, data2: any) => {
          const field = event.sortField as string; //metto as string perchè sortField potrebbe anche essere un Array nel caso in cui ammettessimo il multisort, però nel nostro caso ordiniamo sempre o in base al nome o in base alla mail, mai in base a entrambi e quindi sortField sarà sempre una stringa
          let value1 = data1[field];
          let value2 = data2[field];
          let result = 0;

          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

          return event.sortOrder === -1 ? -result : result;
        });
      }

      const start = event.first || 0;
      const end = start + (event.rows || 10);

      this.users = data.slice(start, end);
      this.isLoading = false;
    }, 10);
  }

  editUser(user: User) {
    alert('Utente ' + user.name + ' modificato!');
  }
}
