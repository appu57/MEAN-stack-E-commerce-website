import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/userservice';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any;
Products:any;
object:any=[];
showmode:string;

  constructor(private router:Router, private http:HttpClient,
    private service:UserService) { 
 const Navigation =this.router.getCurrentNavigation();
 this.data =Navigation?.extras.state;
 this.showmode="show";
 


 }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/multer").subscribe((res=>{
      this.Products= res;
    }))
  }
Logout(){
  console.log(localStorage);
  this.service.logoutuser().subscribe((res)=>{
    console.log(res);
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.router.navigateByUrl('/customer');


  })
}

addtocart(key:String){
   this.object.push(key);
   console.log(this.object);
}

cart(){
  this.showmode='cart';
}
}
