import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!:string;
  brandService = inject(BrandService)
  router = inject(Router)
  route = inject(ActivatedRoute);
  id!:string;
  ngOnInit(){
    this.loadBrandDetails();
  }
  loadBrandDetails() {
    this.id = this.route.snapshot.params["id"];
  
    if (this.id) { 
      this.brandService.getBrandById(this.id).subscribe({
        next: (result) => {
          this.name = result.name;
        },
        error: (err) => {
          console.error("Error fetching brand:", err);
        }
      });
    }
  }
  add(){
    this.brandService.addBrand(this.name).subscribe((result)=>{
      alert("Brand Added Successfully");
      this.router.navigateByUrl("/admin/brands")
    })
  }

  update(){
    this.brandService.updateBrand(this.id,this.name).subscribe((result)=>{
      alert("Brand updated Successfully");
      this.router.navigateByUrl("/admin/brands")
    })
  }
}
