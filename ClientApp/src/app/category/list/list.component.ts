import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryIndex } from 'src/app/models/categoryIndex';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: CategoryIndex[] = [];

  arrowRight = faArrowRight;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.indexCategories().subscribe((val) => {
      this.categories = val;
    });
  }
}
