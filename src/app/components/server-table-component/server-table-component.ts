import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PrimeTemplate } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-server-table-component',
  standalone: true,
  imports: [ButtonModule, TableModule, TagModule, PrimeTemplate, CommonModule, RippleModule],
  templateUrl: './server-table-component.html',
  styleUrl: './server-table-component.scss',
})
export class ServerTableComponent implements OnInit {
  users: User[] = [];
  totalRecords: number = 0;
  expandedRows: Record<number, boolean> = {}; // `expandedRows` è un oggetto con chiavi numeriche e valori booleani

  apiService = inject(ApiService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.apiService.getUsersPaginated(0, 10, '', 'asc').subscribe((response) => {
      this.users = response.users;
      this.cdr.markForCheck();
    });

    this.apiService.getTotalRecords().subscribe((total) => {
      this.totalRecords = total;
      this.cdr.markForCheck();
    });
  }

  loadUsers(event: TableLazyLoadEvent) {
    // event.first = numero di righe saltate (0, 10, 20, ...)
    // event.rows = numero di righe per pagina (10)
    const skip = event.first || 0;
    const limit = event.rows || 10;
    const sortBy = (event.sortField as string);
    const order = event.sortOrder === 1 ? 'asc' : 'desc';
    this.apiService.getUsersPaginated(skip, limit, sortBy, order).subscribe((response) => {
      this.users = response.users;
      this.cdr.markForCheck();
    });
  }

  onRowExpand(event: any) {
    console.log('Row expanded:', event.data);
    this.expandedRows[event.data.id] = true;
    this.cdr.markForCheck();
  }

  onRowCollapse(event: any) {
    console.log('Row collapsed:', event.data);
    delete this.expandedRows[event.data.id];
    this.cdr.markForCheck();
  }

  editUser(user: User) {
    alert('Utente ' + user.username + ' modificato!');
  }
}
