import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, MatSelectModule, FormsModule, MatButtonModule],
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
  route = inject(ActivatedRoute);
  category:Category[] =[];
  brands:Brand[]=[];
  isNext=true;

  ngOnInit() {

    this.customerService.getCategories().subscribe((result:any)=>{
      this.category = result;
    });

    this.customerService.getBrands().subscribe((result:any)=>{
      this.brands = result;
    })

    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      this.getAllProducts();
    })
  }

  getAllProducts() {
    setTimeout(()=>{
      this.customerService.getProducts(this.searchTerm, this.categoryId, this.page, this.pageSize, this.sortBy, this.sortOrder, this.brandId).subscribe((result) => {
        this.products = result;
        if(result.length < this.pageSize ){
          this.isNext = false;
        }
      })
    },500);
  };

  orderChange(event:any){
    this.sortBy = 'price';
    this.sortOrder = event;
    this.getAllProducts()
  }

  pageChange(page:number){
    this.page = page;
    this.isNext = true;
  }
}
