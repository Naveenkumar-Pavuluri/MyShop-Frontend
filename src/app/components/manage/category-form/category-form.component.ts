import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  name!:string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit:boolean = false;
  id!:string;
  ngOnInit(){
    this.id =  this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result:any)=>{
        this.name = result.name;
      })
    }
  }
  add(){
    this.categoryService.addCategories(this.name).subscribe((result:any)=>{
        alert("Category added succesfully");
        this.router.navigateByUrl("admin/categories");
    })
  }

  update(){
    this.categoryService.updateCategoryById(this.id,this.name).subscribe((result:any)=>{
      alert("Category updated succesfully");
      this.router.navigateByUrl("admin/categories");
  })
  }
}
