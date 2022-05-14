import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient} from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any;
  constructor(private router:Router, private http:HttpClient,
    private service:UserService, private flash:FlashMessagesService) { 
 const Navigation =this.router.getCurrentNavigation();
 this.data =Navigation?.extras.state;
    this.flash.show('Welcome to Order.com ');
 


 }

  ngOnInit(): void {
    
  }
Logout(){
  this.service.logoutuser().subscribe((res)=>{
    console.log(res);
    this.router.navigateByUrl('/');

  })
}


}
