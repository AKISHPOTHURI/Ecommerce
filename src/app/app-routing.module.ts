import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerProductUpdateComponent } from './seller-product-update/seller-product-update.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'sellerlogin', component:SellerLoginComponent},
  {path:'sellerhome', component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:'selleraddproduct', component:SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:'sellerproductupdate/:id', component:SellerProductUpdateComponent, canActivate:[AuthGuard]},
  {path:'search/:query', component:SearchComponent},
  {path:'details/:productId', component:ProductDetailsComponent},
  {path:'userauth', component:UserAuthComponent},
  {path:'cart', component:CartpageComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [HomeComponent,SellerLoginComponent,SellerAddProductComponent,
//   SellerProductUpdateComponent,ProductDetailsComponent,UserAuthComponent, CartpageComponent,
//   CheckoutComponent]
