import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  apiUrl = 'https://dummyjson.com/users';

  getUsersPaginated(
    skip: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
    filter: string = '',
  ): Observable<{ users: User[]; total: number }> {
    // Determina se ci sono filtri attivi
    const hasFilter = this.hasActiveFilter(filter);

    // Se c'è un filtro, carica TUTTI i dati (o un set grande) da pagina 1
    // Altrimenti usa skip/limit normali per la paginazione
    const effectiveSkip = hasFilter ? 0 : skip;
    const effectiveLimit = hasFilter ? 300 : limit; // 300 è abbastanza grande per coprire tutti gli utenti di dummyjson

    const url = `${this.apiUrl}?skip=${effectiveSkip}&limit=${effectiveLimit}&sortBy=${sortBy}&order=${order}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        let users = response.users;
        let total = response.total;

        // Se c'è un filtro attivo, applicalo lato client su TUTTI i dati caricati
        if (hasFilter) {
          users = this.applyFilters(users, filter);
          total = users.length; // Aggiorna il totale ai risultati filtrati
        }

        return {
          users: users,
          total: total,
        };
      }),
    );
  }

  /**
   * Verifica se ci sono filtri attivi nel filtro string
   */
  private hasActiveFilter(filter: string): boolean {
    try {
      if (!filter) {
        return false;
      }
      const filterObj = JSON.parse(filter);
      const username = filterObj.username?.trim() || '';
      const email = filterObj.email?.trim() || '';
      return username.length > 0 || email.length > 0;
    } catch (e) {
      return false;
    }
  }

  /**
   * Applica i filtri ai dati lato client
   */
  private applyFilters(users: User[], filter: string): User[] {
    try {
      const filterObj = JSON.parse(filter);
      const usernameSearch = filterObj.username?.toLowerCase().trim() || '';
      const emailSearch = filterObj.email?.toLowerCase().trim() || '';

      return users.filter((user: User) => {
        const matchUsername = usernameSearch
          ? user.username.toLowerCase().includes(usernameSearch)
          : true;

        const matchEmail = emailSearch ? user.email.toLowerCase().includes(emailSearch) : true;

        return matchUsername && matchEmail;
      });
    } catch (e) {
      console.error('Filter parse error:', e);
      return users;
    }
  }

  getTotalRecords(): Observable<number> {
    return this.http
      .get<{ users: User[]; total: number }>(this.apiUrl)
      .pipe(map((response) => response.total));
  }
}
