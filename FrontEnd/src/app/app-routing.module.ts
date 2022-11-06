import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component'
import { HomeComponent } from './home/home.component';
import { AdminComponent } from '../app/admin/admin.component'
import { CartComponent } from './cart/cart.component';
import {ViewComponent} from './view/view.component';

import { AuthGuard } from './shared/auth.guard';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent},
  { path:'header',component:HeaderComponent},
  { path: 'admin', component: AdminComponent},
  {
    path: "cart", component: CartComponent,canActivate:[AuthGuard],
    data:{
      role:'Admin',
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'viewproduct/:id',     component: ViewComponent },
  { path: 'viewprod',     component: ViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
