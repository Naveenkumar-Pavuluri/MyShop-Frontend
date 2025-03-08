import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  http = inject(HttpClient);

  register(name:string, email:string, password:string){
    return this.http.post(environment.apiUrl+"/auth/register",{
      name,email,password
    })
  }

  login( email:string, password:string){
    return this.http.post(environment.apiUrl+"/auth/login",{
      email,password
    })
  }
}
