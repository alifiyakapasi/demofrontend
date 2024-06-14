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
  categoryFormArray: Array<any> = [];
  categories = [
    { name: "AB", id: 1 },
    { name: "BC", id: 2 },
    { name: "CD", id: 3 },
    { name: "DE", id: 4 }
  ];
  productForm!: FormGroup;
  productStatus?: string;
  product: Product = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productQuantity: 0,
    categoryId: '',
    productStatus: '',
    selectedCategory: []
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

  // For Checkbox 
  onChange(email: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.categoryFormArray.push(email);
    } else {
      let index = this.categoryFormArray.indexOf(email);
      this.categoryFormArray.splice(index, 1);
    }
  }

  // selectAll() {
  //   let checkBoxes = document.querySelectorAll('.form-check-input');
  //   checkBoxes.forEach(ele => ele.click());
  // }
  selectAll() {
    let checkBoxes = document.querySelectorAll('.form-check-input') as NodeListOf<HTMLInputElement>;
    checkBoxes.forEach((ele: HTMLInputElement) => {
        ele.click();
    });
}




  duplicate() {
    console.log(this.categoryFormArray);
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
        //categoryId: [null, Validators.required],
        productStatus: ['']
      });
  }

  saveProduct(): void {
    const data = {
      productName: this.productName?.value,
      productDescription: this.productDescription?.value,
      productPrice: this.productPrice?.value,
      productQuantity: this.productQuantity?.value,
      categoryId: this.productForm.get('categoryId')?.value,
      productStatus: this.productForm.get('productStatus')?.value,
      selectedCategory: this.categoryFormArray
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
    location.reload();
    this.productForm.patchValue
      ({
        productName: null,
        productDescription: null,
        productPrice: null,
        productQuantity: null,
        categoryId: null,
        productStatus: null
      });
  }

  retrieveCategory(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.category = categories;
      this.categorySubject.next(categories);
    });
  }
}
