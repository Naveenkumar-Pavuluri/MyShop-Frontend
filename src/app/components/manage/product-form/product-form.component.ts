import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isNewProduct: [false]
  })

  categorieService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  categories: Category[] = []
  brand: Brand[] = []
  id!: string;

  ngOnInit() {
    this.categorieService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrand().subscribe((result) => {
      this.brand = result;
    })

    this.id = this.route.snapshot.params["id"];

    if (this.id) {
      this.productService.getProductsById(this.id).subscribe((result) => {
        for (let i = 0; i < result.images.length; i++) {
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      })
    }
  }
  addProduct() {
    let value = this.productForm.value;
    this.productService.addProduct(value as any).subscribe((result) => {
      alert("Product added succesfully");
      this.router.navigateByUrl("/admin/products")
    })
  }

  updateProduct() {
    let value = this.productForm.value;
    this.productService.updateProductById(this.id, value as any).subscribe((result) => {
      alert("Product updated succesfully");
      this.router.navigateByUrl("/admin/products")
    })
  }

  addImage() {
    return this.images.push(this.formBuilder.control(null));
  }

  deleteImage() {
    return this.images.removeAt(this.formBuilder.control.length - 1);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
