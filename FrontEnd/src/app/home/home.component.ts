import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userservice';
import { HttpClient } from '@angular/common/http';
import { compileClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  Products: any;
  object: any;
  card: any;
  cartId: any;
  _id: string;
  flag: boolean;
  particularuser: any;
  Navigation: any;
  showmode: string;

  constructor(private router: Router, private http: HttpClient,
    private service: UserService, private route: ActivatedRoute) {

    const navigation = this.router.getCurrentNavigation()?.extras.state;
    console.log(navigation);
    this.data = navigation;


  }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/multer").subscribe((res => {
      this.Products = res;
      const id = localStorage.getItem('id');
      this.http.get("http://localhost:3000/users/userid/" + id).subscribe((res) => {
      this.particularuser = res;
        // this.flag = this.particularuser.Admin;
        localStorage.setItem('flag',this.particularuser.Admin);
      });

    }));


    // console.log(history.state); way of interaction between two components


    // this.route.queryParams.subscribe((params)=>{
    //  this.data=params;
    //  console.log(this.data);
    // })

  }



  addtocart(key: any) {

    this.object = localStorage.getItem('id');
    console.log(this.object);
    this.http.post("http://localhost:3000/multer/addtocart/" + this.object, key).subscribe((res) => {
      console.log(res);
    })


  }
  deletefromcart() {
    this.http.delete("http://localhost:3000/multer/" + this.object + "/deletefromcart/" + this.cartId).subscribe((res) => {
      console.log(res);
    })
  }

  displayfruits() {
    this.http.get("http://localhost:3000/multer/fruits").subscribe((res) => {
      this.Products = res;

    })
  }
  displayveg() {
    this.http.get("http://localhost:3000/multer/Vegetables").subscribe((res) => {
      this.Products = res;

    })
  }
  all() {
    this.http.get("http://localhost:3000/multer/").subscribe((res) => {
      this.Products = res;

    })
  }


  movetocart() {
      if(localStorage.getItem('flag')=='true')
      {
        this.router.navigateByUrl('/cart');
      }
      else{
        console.log("no");
      }
  }


}
