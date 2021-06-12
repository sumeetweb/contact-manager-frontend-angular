import { Component, OnInit } from '@angular/core';
import {ContactService} from 'src/app/contact.service';

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
  public contacts:any[] = [];
  public isError:boolean = false;

  constructor(private _contact:ContactService) { }

  ngOnInit(): void {
    console.log(this.userEmail);
    this.loadContacts();
  }

  loadContacts():void {
    this._contact.getContactsbyUserId(this.userId).subscribe(res=>{
      console.log(res);
      this.contacts = res.contacts;
      if(res.contacts.length){
        this.isError = true;
      }
    },err=>{
      console.log(err);
      this.isError = true;
    } )
  }

    onDeleteContact(contact:any){
      this._contact.deleteContact(contact._id).subscribe(res=>{
        alert(res.message);
      }, err=>{
        alert(err.error.message);
      });
      this.loadContacts();
    }

}

