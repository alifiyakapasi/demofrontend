import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  productForm: FormGroup;
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

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group
      ({
        productName: ['', Validators.required],
        productDescription: ['', Validators.required],
        productPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        productQuantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        categoryId: ['', Validators.required]
      });
  }

  saveProduct(): void {
    const data = {
      productName: this.productName?.value,
      productDescription: this.productDescription?.value,
      productPrice: this.productPrice?.value,
      productQuantity: this.productQuantity?.value,
      categoryId: this.categoryId?.value
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

  get productName() {
    return this.productForm.get('productName');
  }
  get productDescription() {
    return this.productForm.get('productDescription');
  }
  get productPrice() {
    return this.productForm.get('productPrice');
  }
  get productQuantity() {
    return this.productForm.get('productQuantity');
  }
  get categoryId() {
    return this.productForm.get('categoryId');
  }

  newProduct(): void {
    location.reload();
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
