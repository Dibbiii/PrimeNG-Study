import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';
import { TableData } from '../interfaces/table-data-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Punto al Backend Spring Boot
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(page: number, perPage: number): Observable<TableData<User>> {
    // Spring Boot Pagination usa 'page' (0-based) e 'size'
    // e risponde con un oggetto { users: [], total: 100 }
    return this.http.get<TableData<User>>(`${this.apiUrl}/users?page=${page}&size=${perPage}`);
  }

  // Metodo per la paginazione server-side con Spring Boot
  getUsersPaginated(
    skip: number,
    limit: number,
    sortBy: string,
    order: string,
    q?: string,
  ): Observable<TableData<User>> {
    let params = `skip=${skip}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
    if (q) {
      params += `&q=${q}`;
    }
    return this.http.get<TableData<User>>(`${this.apiUrl}/users?${params}`);
  }

  // Crea un nuovo utente
  // Omit crea un nuovo tipo escludendo specifiche proprietà da un tipo esistente
  // Sintassi: Omit<Type, Keys>
  // Type: il tipo di partenza
  // Keys: le proprietà da escludere -> in questo caso l'id perchè viene generato da SpringBoot

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // Aggiorna un utente esistente
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // Elimina un utente
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/posts`);
  }
}
