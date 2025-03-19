import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:Product;
  wishlistService = inject(WishlistService);
  cartService = inject(CartService)

  get sellingPrice(){
    return Math.floor(Math.round(this.product.price - this.product.price * (this.product.discount/100))/100)*100;
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
    if(this.wishlistService.wishlist.find((x: any)=> x._id ==product._id)) return true;
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
