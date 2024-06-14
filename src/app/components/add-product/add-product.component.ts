import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { FileUploadService } from '../add-product/file-upload.service';

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
  file: File | null = null; // Variable to store file to Upload

  product: Product = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productQuantity: 0,
    categoryId: '',
    productStatus: '',
    selectedCategory: [],
    fileUpload: ''
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

  selectAll() {
    let checkBoxes = document.querySelectorAll('.form-check-input') as NodeListOf<HTMLInputElement>;
    checkBoxes.forEach((ele: HTMLInputElement) => {
      ele.click();
    });
  }

  // For File Upload
  onChangeFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService) {
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
    // Upload the file first
    if (this.file) {
      this.fileUploadService.upload(this.file).subscribe({
        next: (response) => {
          const filename = response.name;
          const data = {
            productName: this.productName?.value,
            productDescription: this.productDescription?.value,
            productPrice: this.productPrice?.value,
            productQuantity: this.productQuantity?.value,
            categoryId: this.productForm.get('categoryId')?.value,
            productStatus: this.productForm.get('productStatus')?.value,
            selectedCategory: this.categoryFormArray,
            fileUpload: filename // Pass the filename to your product data
          };
          console.log("data", data);
          // Call productService to save the product
          this.productService.create(data).subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
            },
            error: (e) => console.error(e)
          });
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
    } else {
      console.error('No file selected.');
    }
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
