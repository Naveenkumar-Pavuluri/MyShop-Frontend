import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, MatButtonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bangerImages: Product[] = []
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  customOptions: OwlOptions = {
    loop: true,
    margin: 10, 
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2
      },
      768: {
        items: 3 
      },
      1024: {
        items: 4 
      }
    }
  };



  ngOnInit() {
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      this.bangerImages.push(...result)
    });

    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      this.bangerImages.push(...result)
    });
    this.wishlistService.init();
    this.cartService.init();
  }
}
