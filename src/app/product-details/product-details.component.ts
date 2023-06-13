import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  removeCart=false;
  cartData:product|undefined;
 constructor(private activateRoute:ActivatedRoute, private product:ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData =result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId == item.id.toString());
        if(items.length){
          this.removeCart=true;
        } else {
          this.removeCart=false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result) => {
          let item = result.filter((item:product) => productId?.toString()===item.productId?.toString())
      if(item.length){
        this.cartData = item[0];
        this.removeCart=true;
      }
        })
      }

    })
    console.log(this.removeCart);
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val === 'plus'){
      this.productQuantity += 1
    }else if(this.productQuantity>1 && val === 'min'){
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if(this.productData){
      debugger;
      this.productData.quantity = this.productQuantity;
      console.log("productQuantity:", this.productData.quantity)
      if(!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
        console.log(this.productData)
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id;
        let cartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId:number) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }

}
