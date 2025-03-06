import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient)
  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + "/categories");
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(environment.apiUrl + "/categories/" + id);
  }

  updateCategoryById(id: string, name: string) {
    return this.http.put(environment.apiUrl + "/categories/" + id, {
      name: name
    })
  }

  addCategories(name: string) {
    return this.http.post(environment.apiUrl + "/categories", {
      name: name
    });
  }

  deleteCategoryById(id: string) {
    return this.http.delete(environment.apiUrl + "/categories/" + id);
  }
}
