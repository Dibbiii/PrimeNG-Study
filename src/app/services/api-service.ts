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
    limit: number = 10,
    sortBy: string,
    order: 'asc' | 'desc' = 'asc'
  ): Observable<{ users: User[]; total: number }> {
    return this.http.get<any>(`${this.apiUrl}?skip=${skip}&limit=${limit}&sortBy=${sortBy}&order=${order}`).pipe(
      map((response) => ({
        users: response.users,
        total: response.total,
      })),
    );
  }

  getTotalRecords(): Observable<number> {
    return this.http
      .get<{ users: User[]; total: number }>(this.apiUrl)
      .pipe(map((response) => response.total));
  }
}
