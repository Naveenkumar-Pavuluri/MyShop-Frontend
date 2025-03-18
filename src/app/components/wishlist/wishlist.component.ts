import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistService = inject(WishlistService);
  
  ngOnInit(){
    this.wishlistService.init();
  }
}
