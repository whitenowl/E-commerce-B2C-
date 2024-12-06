import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http=inject(HttpClient);

  register(name:string,email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/register",{
      name,
      email,
      password,
    });
  }

  login(email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/login",{
      email,
      password,
    });
  }
  get isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token){
      return true;
    }
    return false;
  }

  get isAdmin(){
    let userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }


  get userName(){
    let userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).name;
    }
    return null;
  }

  get userEmail(){
    let userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).email;
    }
    return null;
  }


  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")

  }
}
