import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public userAuthToken!: string;
  constructor(private _http: HttpClient) { }

  getContactsbyUserId(userId:any) {
    this.userAuthToken = localStorage.getItem('token') || 'null';
    return this._http.get<{message: string, contacts: any}>(environment.baseUrlContact + '/getAll/' + userId, {
      headers: new HttpHeaders().set('x-auth-token', this.userAuthToken)
    })
  }

  createContact(contact: any) {
    this.userAuthToken = localStorage.getItem('token') || 'null';
    return this._http.post<{message: string, contact: any, duplicate: boolean}>(environment.baseUrlContact + '/create', contact,{
      headers: new HttpHeaders().set('x-auth-token', this.userAuthToken)
    })
  }

  updateContact(id: string, contact: any) {
    this.userAuthToken = localStorage.getItem('token') || 'null';
    return this._http.put<{message: string, contact: any}>(environment.baseUrlContact + '/update/' + id, contact,{
      headers: new HttpHeaders().set('x-auth-token', this.userAuthToken)
    })
  }

  deleteContact(id: string) {
    this.userAuthToken = localStorage.getItem('token') || 'null';
    return this._http.delete<{message: string}>(environment.baseUrlContact + '/delete/' + id,{
      headers: new HttpHeaders().set('x-auth-token', this.userAuthToken)
    })
  }

  getSingleContact(id: string) {
    this.userAuthToken = localStorage.getItem('token') || 'null';
    return this._http.get<{message: string, contact: any}>(environment.baseUrlContact + '/getSingle/' + id,{
      headers: new HttpHeaders().set('x-auth-token', this.userAuthToken)
    })
  }

}

