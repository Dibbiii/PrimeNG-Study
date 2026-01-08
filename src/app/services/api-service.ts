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
    // URL semplificato senza filtri della query perchè li metto lato client
    const url = `${this.apiUrl}?skip=${skip}&limit=${limit}&sortBy=${sortBy}&order=${order}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        let users = response.users;
        let total = response.total;

        // filtro per username o email
        if (filter) {
          try {
            const filterObj = JSON.parse(filter);
            const usernameSearch = filterObj.username?.toLowerCase() || '';
            const emailSearch = filterObj.email?.toLowerCase() || '';

            if (usernameSearch || emailSearch) {
              users = users.filter((user: User) => {
                const matchUsername = usernameSearch
                  ? user.username.toLowerCase().includes(usernameSearch)
                  : true;

                const matchEmail = emailSearch
                  ? user.email.toLowerCase().includes(emailSearch)
                  : true;

                return matchUsername && matchEmail;
              });
            }
          } catch (e) {
            console.error('Filter parse error:', e);
          }
        }

        return {
          users: users,
          total: total,
        };
      }),
    );
  }

  getTotalRecords(): Observable<number> {
    return this.http
      .get<{ users: User[]; total: number }>(this.apiUrl)
      .pipe(map((response) => response.total));
  }
}
