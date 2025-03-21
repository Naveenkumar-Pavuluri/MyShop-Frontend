import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  http = inject(HttpClient);

  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/login', {
      email,
      password,
    });
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  get isUserName() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }

  get userEmail() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null;
  }

  get isAdmin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false); // Notify subscribers that the user has logged out
  }

  // Call this method after a successful login to update the state
  notifyLogin() {
    this.isLoggedInSubject.next(true);
  }
}