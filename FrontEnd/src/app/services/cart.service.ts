import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
object:any=[];
  constructor() { }
  addtoCart(product : any){
    this.object.push(product);
 
  }
}
