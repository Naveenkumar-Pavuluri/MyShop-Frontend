import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  customerService = inject(CustomerService);
  product!:Product;
  route = inject(ActivatedRoute);
  mainImage!:string;
  productPrice!:number;
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

}
