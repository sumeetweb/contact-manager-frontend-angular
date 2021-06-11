import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public message:string = '';
  public email!:string;
  public password!:string;
  public isSuccess:boolean = false;
  public isError:boolean = false;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this._router.navigate(['/dashboard']);
    }
  }

  onLoginForm() {
    const loginInfo = {
      email: this.email,
      password: this.password
    }
    this._userService.loginUser(loginInfo).subscribe(response=>{
      console.log(response);
      this.message = response.message;
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
      localStorage.setItem('userFullName', response.user.fullName);
      localStorage.setItem('userEmail', response.user.email);
      this.isSuccess = true;
      this.isError = false;
      this._router.navigate(['/dashboard']);
    }, err=>{
      console.log(err);
      this.message = err.error.message;
      localStorage.clear();
      this.isSuccess = false;
      this.isError = true;
    });
  }
}
