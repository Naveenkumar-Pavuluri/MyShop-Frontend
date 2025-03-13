import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  customerService = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  page = 1;
  pageSize = 6;
  products: Product[] = [];
  route = inject(ActivatedRoute)
  ngOnInit() {
    this.route.queryParams.subscribe((x:any)=>{
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      this.getAllProducts();
    })
  }

  getAllProducts(){
    this.customerService.getProducts(this.searchTerm, this.categoryId, this.page, this.pageSize, this.sortBy, this.sortOrder, this.brandId).subscribe((result) => {
      this.products = result;
    })
  }
}
