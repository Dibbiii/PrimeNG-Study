import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { Table } from '../../interfaces/table-interface';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PrimeTemplate } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ApiService } from '../../services/api-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap, debounceTime } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-server-table-component',
  standalone: true,
  imports: [ButtonModule, TableModule, TagModule, PrimeTemplate, CommonModule, RippleModule, InputTextModule, InputIconModule, IconFieldModule],
  templateUrl: './server-table-component.html',
  styleUrl: './server-table-component.scss',
})
export class ServerTableComponent {
  apiService = inject(ApiService);

  table = signal<Table>({
    first: 0,
    rows: 10,
    sortField: null,
    sortOrder: 1,
    filters: {},
  });

  loading = signal<boolean>(true);

  expandedRows = signal<Set<number>>(new Set());

  userResource = toSignal(
    toObservable(this.table).pipe(
      debounceTime(300),
      tap(() => this.loading.set(true)),
      switchMap((state) => {
        const filterQuery = JSON.stringify(state.filters);

        return this.apiService
          .getUsersPaginated(
            state.first,
            state.rows,
            state.sortField as string,
            state.sortOrder === 1 ? 'asc' : 'desc',
            filterQuery,
          )
          .pipe(tap(() => this.loading.set(false)));
      }),
    ),
    { initialValue: { users: [], total: 0 } },
  );

  users = computed(() => this.userResource().users);
  totalRecords = computed(() => this.userResource().total);

  loadUsers(event: TableLazyLoadEvent) {
    // Aggiorno il signal. Questo scatenerà a cascata la chiamata API.
    this.table.update((current) => ({
      ...current,
      first: event.first || 0,
      rows: event.rows || 10,
      sortField: (event.sortField as string) || null,
      sortOrder: event.sortOrder || 1,
    }));
  }

  onFilterChange(field: string, value: string) {
    this.table.update((current) => ({
      ...current,
      first: 0, // Reset a pagina 1 quando si filtra! Importante UX!
      filters: { ...current.filters, [field]: value },
    }));
  }

  expandedRowKeys = computed(() => {
    return Object.fromEntries(Array.from(this.expandedRows()).map((id) => [id, true]));
  });

  onRowExpand(event: any) {
    const userId = event.data.id;
    this.expandedRows.update((current) => {
      const newSet = new Set(current);
      newSet.add(userId);
      return newSet;
    });
  }

  onRowCollapse(event: any) {
    const userId = event.data.id;
    this.expandedRows.update((current) => {
      const newSet = new Set(current);
      newSet.delete(userId);
      return newSet;
    });
  }

  editUser(event: User) {
    alert(`Editing user ${event.username}`);
  }
}
