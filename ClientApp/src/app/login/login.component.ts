import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  invalidLogin: boolean;
  reg: boolean;
  @Output() user: string;
  private url = "/api/account";

  constructor(private router: Router, private http: HttpClient) {this.reg=false; }
  public registration(){ this.reg = !this.reg; };


  public login = (form: NgForm) => {
    let username = form.value.username;
    let password = form.value.password;
    if (this.reg) {
      this.http.post(this.url + "/reg", {username,password}).subscribe(resp=>{

        this.router.navigate(["login"]);
      }, err => console.log(err));
  this.reg=false;
  
    } else {
     

      this.http.post(this.url + "/token", { username, password })
        .subscribe(response => {
          this.user = (<any>response).username;
          console.log(this.user);
        let token = (<any>response).access_token;
      localStorage.setItem("jwt", token);
          this.invalidLogin = false;
          this.http.get("/api/account/login").subscribe(r => this.user = (<any>r).username);
          
      this.router.navigate(["/"]);
      }, err => {
          console.log(err);
      this.invalidLogin = true;
    });}
  }
}
