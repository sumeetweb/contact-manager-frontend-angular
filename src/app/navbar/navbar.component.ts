import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public name:string = localStorage.getItem('userFullName') ?? 'null';
  constructor(private _user:UserService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    return this._user.checkLogin();
  }

}
