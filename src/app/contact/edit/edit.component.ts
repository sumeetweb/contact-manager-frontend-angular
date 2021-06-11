import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/contact';
import { ContactService } from 'src/app/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public contactId!: string;
  public contact = new Contact('','','','','','');
  public message!:string;
  public isSuccess:boolean = false;
  public isError:boolean = false;
  public imgUrl:string = '';
  constructor(private _contact:ContactService, private _acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._acroute.params.subscribe(params => {
      this.contactId = params.id;
    })

    this._contact.getSingleContact(this.contactId).subscribe(res=>{
      console.log(res);
      this.contactId = res.contact._id;
      this.contact.name = res.contact.name;
      this.contact.email = res.contact.email;
      this.contact.phone = res.contact.phone;
      this.contact.image = res.contact.image;
      this.contact.type = res.contact.type;
      this.contact.userId = res.contact.userId;
      this.imgUrl = environment.baseUrlUpload + this.contact.image;
    }, err=>{
      console.log(err);
    })
  }

  onUpdateContact(): void {
    console.log(this.contact);
    this._contact.updateContact(this.contactId, this.contact).subscribe(res=>{
      this.message = res.message;
      this.isError = false;
      this.isSuccess = true;
    }, err=>{
      this.message = err.error.message;
      this.isError = true;
      this.isSuccess = false;
    })
  }

}
