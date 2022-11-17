import { Component, OnInit, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EventEmitter } from 'ws';
import { UserService } from '../services/userservice';
import {Router} from '@angular/router';
import { user } from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
search:any;
id:any;
userlogin:string;

  constructor( private http: HttpClient,private router:Router,
    private service: UserService) { 
      this.id=localStorage.getItem('id');
  

    }

  ngOnInit(){
  
  }
searchedproduct(){
     this.router.navigate(['viewprod'],{state:this.search});
     localStorage.setItem('search',this.search);
}
Logout() {
  console.log(localStorage);
  this.service.logoutuser().subscribe((res) => {
    console.log(res);
    localStorage.removeItem('token');
    localStorage.removeItem('search');
    localStorage.removeItem('flag');

    console.log(localStorage.getItem('id'));
    this.router.navigateByUrl('/customer');



  })
}

}
