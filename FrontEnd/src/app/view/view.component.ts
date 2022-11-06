import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service';
import {Params,ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id:string;
  product:any;
  object:any;
  prod:any;
  searched:{};
  constructor(private service:CartService,  private route: ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(){
    // this.service.getProductId()
    // .subscribe(ProductId => this.ProductId = ProductId);
    // this.route.params
    // .pipe(switchMap((params: Params) => this.service.getProduct(params['id'])))
    // .subscribe(prod=> { this.product = prod; }
    this.id = this.route.snapshot.params['id'];
    this.http.get("http://localhost:3000/multer/viewproduct/"+this.id).subscribe((res)=>{
      this.product=res;
      console.log(this.product);
    })

    // this.prod=localStorage.getItem('search');
    // this.service.viewsearch(this.prod).subscribe((res)=>{
    //   this.searched=res;
    //   console.log(this.searched);
    // })

  }
 addtocart(product:any)
 {
 this.object=localStorage.getItem('id');
      this.http.post("http://localhost:3000/multer/addtocart/"+this.object,product).subscribe((res)=>{
        console.log(res);
    })
 }

}
