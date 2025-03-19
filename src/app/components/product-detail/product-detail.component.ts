import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  customerService = inject(CustomerService);
  product!:Product;
  route = inject(ActivatedRoute);
  mainImage!:string;
  productPrice!:number;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService)
  ngOnInit(){
    const id = this.route.snapshot.params["id"];
    this.customerService.getProductsById(id).subscribe((result)=>{
      this.product = result;
      this.mainImage = this.product.images[0];
    })
  }

  get sellingPrice(){
    return Math.round(this.product.price - this.product.price * (this.product.discount/100));
  }

  addToWishlist(product:Product){
    if(this.isInWishlist(product)){
      this.wishlistService.removeFromWishlist(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      })
    }else{
      this.wishlistService.addToWishlist(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      })
    }
  }

  isInWishlist(product:Product){
    let isExists = this.wishlistService.wishlist.find((x: any)=> x._id ==product._id);
    if(isExists) return true;
    else return false;
  }

  addToCart(productId:Product){
    if(!this.isProductInCart(productId._id!)){
      this.cartService.addToCart(productId._id!, 1).subscribe((result) =>{
        this.cartService.init();
      });
    }else{
      this.cartService.removeFromCart(productId._id!).subscribe((result) =>{
        this.cartService.init();
      });
    }
  }

  isProductInCart(product:string){
    if(this.cartService.items.find(x => x.product._id==product))return true;
    else return false;
  }
}
