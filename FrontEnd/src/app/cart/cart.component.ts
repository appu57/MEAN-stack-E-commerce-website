import { Component, OnInit } from '@angular/core';
// import {DomSanitizerImp, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  show: any[];
  data: any;
  image: string = "";
  object:any = [];
  baseUrl="http://localhost:3000/public/"
  safeUrl:any;
  sanitizedUrl:any;
  
  constructor(private service: UserService) {

   }

  ngOnInit(): void {
  }


  get() {
    this.service.getCartdetails().subscribe((res:any) => { this.data = res;

          // this.data.forEach((element:any) => {
          //   let file = new Blob(element.img.data)
          //   let url =  URL.createObjectURL(file);
          //   this.safeUrl = this.sanitize.bypassSecurityTrustResourceUrl(url);
          //   this.sanitizedUrl = this.sanitizerImpl.sanitize(SecurityContext.RESOURCE_URL, this.safeUrl);


          //   this.object.push({
          //     name:element.name,
          //     img: url
          //   })
          // });
          // console.log(this.object)
          });
  }
}
