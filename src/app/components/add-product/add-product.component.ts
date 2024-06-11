import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  category?: Category[];
  product: Product = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productQuantity: 0,
    categoryId: ''
  };
  submitted = false;

  ngOnInit() {
    this.retrieveCategory();
  }

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  saveProduct(): void {
    const data = {
      productName: this.product.productName,
      productDescription: this.product.productDescription,
      productPrice: this.product.productPrice,
      productQuantity: this.product.productQuantity,
      categoryId: this.product.categoryId
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      productName: '',
      productDescription: '',
      productPrice: 0,
      productQuantity: 0,
      categoryId: ''
    };
  }

  retrieveCategory(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.category = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
