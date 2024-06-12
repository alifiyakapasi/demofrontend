import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categoryControl = new FormControl('');
  category: Category[] = [];
  filteredCategories?: Observable<Category[]>;
  private categorySubject = new BehaviorSubject<Category[]>([]);
  productForm!: FormGroup;
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
    console.log(this.category);
    // Filter Category according to input
    this.categorySubject.subscribe(categories => {
      this.filteredCategories = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }
  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.category.filter(category => category.categoryName?.toLowerCase().includes(filterValue));
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
    this.submitted = false;
    this.productForm.patchValue
      ({
        productName: null,
        productDescription: null,
        productPrice: null,
        productQuantity: null,
        categoryId: null
      });
  }

  retrieveCategory(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.category = categories;
      this.categorySubject.next(categories); // Notify subscribers about the change in category
    });
  }
}
