import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  category?: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategory();
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
