import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,MatButtonModule,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService = inject(CustomerService);
  newProducts:Product[]=[];
  featuredProducts:Product[]=[];
  bangerImages:Product[]=[]
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  
  ngOnInit(){
    this.customerService.getNewProducts().subscribe((result)=>{
      this.newProducts = result;
      this.bangerImages.push(...result)
    });

    this.customerService.getFeaturedProducts().subscribe((result)=>{
      this.featuredProducts = result;
      this.bangerImages.push(...result)
    })
  }
}
