import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:Product;
}
