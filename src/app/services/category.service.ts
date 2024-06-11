import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/getcategory`);
  }

  get(id: any): Observable<Category> {
    return this.http.get<Category>(`${environment.baseUrl}/getcategory${id}`);
  }
}
