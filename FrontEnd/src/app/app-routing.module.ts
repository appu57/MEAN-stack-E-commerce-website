import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from './customer/customer.component'
import { HomeComponent } from './home/home.component';
import {AdminComponent} from '../app/admin/admin.component'
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'Cust', component:CustomerComponent},
  {path:'admin', component:AdminComponent},
  {path:"login", redirectTo:'/login' , pathMatch:"full"},
  {path:"cart" , component:CartComponent},
  {path:'',redirectTo:'/home', pathMatch :'full'},
  {path:'home',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
