import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName:string = '';
  searchResult: undefined | product[];
  userName:string = "";
  cartItems=0;
  constructor(private router:Router, private product:ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      if(val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType = "seller"
          if (localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData =sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.userName
          }
        }else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
          this.menuType = 'user';
        }else{
          this.menuType='default'
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
      console.log(this.cartItems)
    }
    
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
      console.log(this.cartItems)
    })
 
  }
  

  logout(): void {
    localStorage.removeItem('seller');
    this.router.navigate(["/"])
  }

  userLogOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/userauth'])
  }

  searchProduct(query:KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((data) => {
      if (data.length > 5) {
        data.length = 5
      }
      this.searchResult = data;
    })
  }

  hideSearch(){
    this.searchResult = undefined;
  }

  redirectToDetails(id:number){
    this.router.navigate(['/details/'+id])
  }

  search(query:string) {
    this.router.navigate([`/search/${query}`])
  }
}
