import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public contact = new Contact('','','','','','');
  public message!:string;
  public isSuccess:boolean = false;
  public isError:boolean = false;
  
  constructor(private _contact:ContactService) { }

  ngOnInit(): void {
  }

  onAddContact(): void {
    this._contact.createContact(this.contact).subscribe(res=>{
      this.message = res.message;
      console.log(res.contact);
      if(res.duplicate){
        this.isSuccess = false;
        this.isError = true;
      } else {
        this.isSuccess = true;
        this.isError = false;
      }
    }, err=>{
      this.message = err.error.message;
      this.isSuccess = false;
      this.isError = true;
    })
  }

}