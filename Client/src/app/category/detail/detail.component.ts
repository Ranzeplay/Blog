import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDetail } from 'src/app/models/categoryDetail';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  categoryName: string = '';
  content: CategoryDetail = CategoryDetail.newEmpty();

  constructor(
    public route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryName = params['id'];
      this.categoryService
        .getCategory(this.categoryName)
        .subscribe((category) => {
          this.content = category;
        });
    });
  }
}
