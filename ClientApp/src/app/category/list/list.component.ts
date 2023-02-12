import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryIndex } from 'src/app/models/categoryIndex';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: CategoryIndex[] = [];

  arrowRight = faArrowRight;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  ngOnInit(): void {
    this.http
      .get<CategoryIndex[]>(this.baseUrl + '/Category/List/')
      .subscribe((val) => {
        this.categories = val;
      });

  }
}
