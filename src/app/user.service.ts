import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  validateUser(email:any){
    return this._http.post<{message: string, check: boolean}>(environment.baseUrlUser + '/search', email);
  }

  registerUser(user:any){
    return this._http.post<{message: string, user: any}>(environment.baseUrlUser + '/register', user);
  }

  loginUser(loginData:any){
    return this._http.post<{message: string, user: any, token:string}>(environment.baseUrlUser + '/login', loginData);
  }

  checkLogin() : boolean {
    let userAuthToken:any = localStorage.getItem('token');
    if(userAuthToken === null){
      return false;
    } else {
      return !helper.isTokenExpired(userAuthToken);
    }
  }
}
