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
  public imageFile!:any;
  
  constructor(private _contact:ContactService) { }

  ngOnInit(): void {
  }

  onAddContact(): void {
    // let formData:any = {
    //   name: this.contact.name,
    //   email: this.contact.email,
    //   phone: this.contact.phone,
    //   type: this.contact.type,
    //   image: this.imageFile
    // };
    // console.log(formData);
    this._contact.createContact(this.contact).subscribe(res=>{
      this.message = res.message;
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