import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  uri = 'user';

  getAll() {
    return this.http.get<User[]>(`${this.uri}/users`);
  }

  getUser() {
    return this.http.get<User>(`${this.uri}/`)
  }

  updateUser(data) {
    return this.http.put<User>(`${this.uri}/`, data)
  }
}
