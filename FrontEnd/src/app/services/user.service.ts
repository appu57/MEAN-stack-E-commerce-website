import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Body } from '@angular/http/src/body';


@Injectable({
  providedIn: 'root'
})
export class UserService {
private headers=new HttpHeaders().set('Content-Type','appication/json');
  constructor(private http:HttpClient) { }


  postUser(user:any){
    return this.http.post("http://localhost:3000/users/signup",user);

  }
  getUser(){
    return this.http.get("http://localhost:3000/users/signup");

  }
  logoutuser(){
    return this.http.get("http://localhost:3000/users/logout");
  }
  loginUser(data:any){
     return this.http.post("http://localhost:3000/users/login",data);
  }

}
