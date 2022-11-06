import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
dishes:any;
  constructor(private http:HttpClient) { }

getProduct(id: string){
  return this.http.get("http://localhost:3000/multer/viewproduct/" + id);
}

viewsearch(name:string)
{
  return this.http.get("http://localhost:3000/multer/searchedprod/"+name);
}

// getProductId() {
//   return this.getProducts().pipe(map(dishes => dishes.map(dish => dish.id)))
//     .pipe(catchError(error => error));
// }
// getProducts(){
  //   this.dishes= this.http.get("http://localhost:3000/");
  // } 
}
