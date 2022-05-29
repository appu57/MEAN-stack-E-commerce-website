import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
// import {DomSanitizerImp, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/userservice';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 addProduct :FormGroup
  data: any;
  image: string = "";
  object:any = [];
  baseUrl="http://localhost:3000/public/"
  Product:any;
  length:any;
  showmode:String;
  upload:any;
  ProductDetails = { name: String, description: String, price: Number};
 
  
  constructor(private service: UserService, private http:HttpClient,private fb:FormBuilder,private router:Router) {
    this.createForm();
   }

  ngOnInit(): void {
 

  }

  createForm(){
    this.addProduct=this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      productType:['',Validators.required]
      
    })
  }

 
  

fruits(){
this.showmode="fruits";

}



submit(){
  if(this.addProduct.valid){
    this.service.postCartDetails(this.addProduct.value).subscribe((res)=>{
      console.log(res);
      this.showmode="imageUpload";
      this.http.get("http://localhost:3000/multer").subscribe((res)=>{
        this.Product=res;
        this.length =this.Product.length;
        console.log(this.length);

    });
    
  })}
}
  
  

formdata=new FormData();

onFileUpload(event:any){
this.image=event.target.files[0];
 
}


Uploaded(id:any){
  console.log(id);
  this.formdata.append('imageFile',this.image);
  this.http.post("http://localhost:3000/multer/"+id+"/image",this.formdata).subscribe((image)=>{
    console.log(image);
    this.router.navigateByUrl('/home');
  });
   
      
  
 
}












































































  // get() {
  //   this.service.getCartdetails().subscribe((res:any) => { this.data = res;

  //         this.data.forEach((element:any) => {
  //           let file = new Blob(element.img.data)
  //           let url =  URL.createObjectURL(file);
  //           this.safeUrl = this.sanitize.bypassSecurityTrustResourceUrl(url);
  //           this.sanitizedUrl = this.sanitizerImpl.sanitize(SecurityContext.RESOURCE_URL, this.safeUrl);


  //           this.object.push({
  //             name:element.name,
  //             img: url
  //           })
  //         });
  //         console.log(this.object)
  //         });
  // }
}
