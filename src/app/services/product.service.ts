import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}`);
  }

  get(id: any): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/add`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}`);
  }

  findByTitle(productName: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/productName?productName=${productName}`);
  }
}
