import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoryService = inject(CategoryService);
  category: Category[]=[];
  router = inject(Router)

  ngOnInit(){
    this.categoryService.getCategories().subscribe((result)=>{
      this.category = result;
      console.log(result);
    })
  }

  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value);
    }
  }

  searchCategory(id:string){
    this.router.navigateByUrl("/products?categoryId="+id!);
  }
}
