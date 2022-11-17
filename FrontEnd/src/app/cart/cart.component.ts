import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
// import {DomSanitizerImp, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/userservice';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  addProduct: FormGroup
  data: any;
  image: string = "";
  object: any = [];
  editProduct:any;
  baseUrl = "http://localhost:3000/public/"
  Product: any;
  length: any;
  id:any;
  admin:any;
  showmode: String;
  upload: any;
  ProductDetails = { name: String, description: String, price: Number };


  
  constructor(private service: UserService, private http: HttpClient, private fb: FormBuilder, private router: Router,
    private flash: FlashMessagesService,private route:ActivatedRoute) {
    this.createForm();
  }

  ngOnInit(){
    this.admin = this.route.snapshot.params['id'];
      console.log(this.admin);

  }

  createForm() {
    this.addProduct = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      productType: ['', Validators.required]

    })
  }




  fruits() {
    this.showmode = "fruits";

  }

  edit(){
    this.showmode="edits";
    this.http.get("http://localhost:3000/multer").subscribe((res)=>{
      this.editProduct=res;
    })

  }



  submit() {
    if (this.addProduct.valid) {
      this.service.postCartDetails(this.addProduct.value).subscribe((res) => {
        console.log(res);
        this.data = res;
        
        
        this.showmode = "imageUpload";
        this.Product = this.data.user._id;
        console.log(this.Product);



      })
    }
  }



  formdata = new FormData();

  onFileUpload(event: any) {
    this.image = event.target.files[0];

  }


  Uploaded() {
    console.log(this.Product);
    this.formdata.append('imageFile', this.image);
    this.http.post("http://localhost:3000/multer/" + this.Product + "/image", this.formdata).subscribe((image) => {
      console.log(image);
      this.router.navigateByUrl('/home');
    });




  }

  deletedata(key:any){
    this.service.deletecartdetails(key._id).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('/home');
    })

  }

  editdata(key:any)
  {
    this.showmode="updated";
    this.id=key._id;
  }


  UpdateDetails(){
    this.http.put("http://localhost:3000/multer/"+this.id+"/image",this.addProduct.value).subscribe((res)=>{
   this.router.navigateByUrl('/home');      
    })
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
