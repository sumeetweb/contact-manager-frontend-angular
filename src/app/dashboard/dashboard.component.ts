import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userFullName:string = localStorage.getItem('userFullName') ?? 'null';
  public userEmail:string = localStorage.getItem('userEmail') ?? 'null';
  public userId:string = localStorage.getItem('userId') ?? 'null';
  public userAuthToken:string = localStorage.getItem('token') ?? 'null';

  constructor() { }

  ngOnInit(): void {
  }

}
