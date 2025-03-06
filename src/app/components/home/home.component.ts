import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,MatButtonModule],
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
      console.log(this.newProducts);
      this.bangerImages.push(...result)
    });

    this.customerService.getFeaturedProducts().subscribe((result)=>{
      this.featuredProducts = result;
      console.log(this.featuredProducts);
      this.bangerImages.push(...result)
    })
  }
}
