import { AnimationGroupMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/userservice';
import { FlashMessagesService } from 'angular2-flash-messages';
import{NavigationExtras,Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

_id:any;
cart:any=[];
bucket:any=[];
order:number;
beforetax:number;
setstatus:string;
showmode:string;
message:string;

  constructor(private fb:FormBuilder,private service:UserService,private http:HttpClient,
    private flash:FlashMessagesService,private router:Router) {
      this.showmode='showcart';
   }

  ngOnInit(): void {

    const value=localStorage.getItem('id');
    this._id=value;
    console.log(this._id);
    this.http.get("http://localhost:3000/users/userid/"+this._id).subscribe((res)=>{
      this.bucket=res;
      this.cart=this.bucket.addtocart;
      console.log(this.cart);
      if(Object.keys(this.cart).length==0)
      {
        this.setstatus='false';
      }
      else{
        this.setstatus='true';
      }
    })
  }


deletefromcart(cartid:string){
    this.http.delete("http://localhost:3000/multer/"+this._id+"/deletefromcart/"+cartid).subscribe((res)=>{
      console.log("deleted");
    })
    this.router.navigateByUrl('/home');
}
 // To make one form visible after clicking submit button in another form within the same page use *ngIf
  //showmode==register in one form and in another form  the opposite the form first to be visible should be declared in constructor with 
  //this.showmode='register' and to make other form visible using click function set this.showmode='unregister'.



//Another way of emitting data between components is using this.router.getCurrentNavigation in childComp in parComp sending data using NavigationExtras={state:data} in childcomp writing as navigation?.extras.state

proceedordering()
{
  this.showmode='orderbill';
  console.log(this.cart);
  var bill=0;
  for(let i=0;i<Object.keys(this.cart).length;i++)
  {
   
    var value=this.cart[i].price;

    bill=bill+value;
    }
    this.beforetax=bill;
    bill+=50;
    this.order=bill;
  console.log(this.order);
}

ordered(){
   this.message="Order Confirmed.Thank you for shopping with us";
}

movebacktocart(){
  this.showmode='showcart';

}

}
