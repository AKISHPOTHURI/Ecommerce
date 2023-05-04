import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { email, order } from '../data-types';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number|undefined
  constructor(private product: ProductService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price+(+item.productPrice* + item.quantity)
        }
      })
      this.totalPrice = price +(price/10) + 100 - (price/10);
      console.warn(this.totalPrice);
    })
  }

  checkOutForm = this.fb.group({
    email:[''],
    address:[''],
    contactDetails:['']
  });

  orderNow(data:{email:string,address:string,contact:string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice) {
      let orderData:order = {
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert('Order placed')
        }
      console.log(data.email)
      let dataEmail:email = {
        email:data.email
      }

      this.product.email(dataEmail).subscribe((result) => {
        if (result) {
          console.warn("Email has been sent.")
        }
      });
      })
    }
  }

}
