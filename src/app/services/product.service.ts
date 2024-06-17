import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/product.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}`);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/${id}`);
  }

  create(data: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}/add`, data);
  }

  update(id: string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.baseUrl}/${id}`);
  }

  deleteAll(): Observable<Product> {
    return this.http.delete<Product>(`${environment.baseUrl}`);
  }

  findByTitle(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/productName?productName=${productName}`);
  }
}
