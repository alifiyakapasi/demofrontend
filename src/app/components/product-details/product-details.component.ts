import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from '@services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productQuantity: 0,
    categoryId: '',
    productStatus: '',
    selectedCategory: [],
    fileUpload: '',
    fromDate: new Date(),
    toDate: new Date(),
    time: DateTime.local()
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    if (!this.currentProduct.id) {
      console.error('Product id is undefined');
      return;
    }
    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
          this.toastr.success('Product was updated successfully!');
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(): void {
    if (!this.currentProduct.id) {
      console.error('Product id is undefined');
      return;
    }
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
          this.toastr.success('Product was deleted successfully!');
        },
        error: (e) => console.error(e)
      });
  }
}
