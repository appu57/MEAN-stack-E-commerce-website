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
  constructor(private router:Router, private http:HttpClient,
    private service:UserService) { 
 const Navigation =this.router.getCurrentNavigation();
 this.data =Navigation?.extras.state;
 


 }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/multer").subscribe((res=>{
      this.Products= res;
    }))
  }
Logout(){
  this.service.logoutuser().subscribe((res)=>{
    console.log(res);
    this.router.navigateByUrl('/');

  })
}


}
