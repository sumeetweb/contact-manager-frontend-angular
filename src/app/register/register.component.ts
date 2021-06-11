import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User('','','');
  public message!: string;
  public isError:boolean = false;
  public isSuccess:boolean = false;
  public chkpass:string = '';
  public emchk:boolean = false;
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmitForm(){
    this._userService.registerUser(this.user).subscribe(response=>{
      //console.log(response);
      this.message = response.message;
      this.isSuccess = true;
      this.isError = false;
    }, err=>{
      //console.log(err);
      this.message = err.error.message;
      this.isSuccess = false;
      this.isError = true;
    });
  }

  onValidateUser(email:any) {
    console.log(email);
    let sendEm = email ?? null;
    let postData = {
      email: email
    };

    if(email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) == email && email != null){
      this._userService.validateUser(postData).subscribe(response => {
        console.log(response.check);
        if(response.check){
          this.emchk = false;
        } else {
          this.emchk = true;
        }
      }, err => {
        console.log(err);
      });
    }
  }

  pass() : boolean {
    if(this.chkpass != this.user.password){
      return true;
    }
    return false;
  }

}
