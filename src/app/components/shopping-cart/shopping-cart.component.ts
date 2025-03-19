import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../types/cart';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,MatButtonModule,FormsModule,MatInputModule,ReactiveFormsModule,MatRadioModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cart:Cart[]=[]
  cartService = inject(CartService);
  total:number=0;
  orderNumber:number = 0;
  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService)
  paymentType= 'cash';
  router = inject(Router);

  ngOnInit(){
    this.cartService.getCartItems().subscribe((result)=>{
      this.cart = result;
      console.log(this.cart);
      this.totalPrice();
    });
  }

  addToCart(productId:string, quantity:number){
    this.cartService.addToCart(productId,quantity).subscribe((result)=>{
      this.cartService.init();
      this.ngOnInit();
    });
  }

  removeFromCart(productId:string){
    this.cartService.removeFromCart(productId).subscribe((result)=>{
      this.cartService.init();
      this.ngOnInit();
    })
  }

  sellingPrice(price:number,discount:number){
    return Math.floor(Math.round(price - price * (discount/100))/100)*100;
  }

  totalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.total = this.total + (Math.round((this.cart[i].product.price - this.cart[i].product.price * (this.cart[i].product.discount / 100)) / 100) * 100 * this.cart[i].quantity);
    }
  }
  checkout(){
    this.orderNumber = 1;
  }

  addressForm = this.formBuilder.group({
    address1:[''],
    address2:[''],
    city:[''],
    pincode:['']
  });

  addAddress(){
    this.orderNumber = 2;
  }

  completeOrder(){
    let order:Order = {
      items:this.cart,
      paymentType:this.paymentType,
      address:this.addressForm.value,
      date: new Date(),
      totalAmount:this.total
    }
    this.orderService.addOrder(order).subscribe((result)=>{
      alert("Your order is placed sucessfully");
      this.ngOnInit();
      this.orderNumber = 0;
      this.router.navigateByUrl("/orders");
    })

    console.log(order);
  }
}
