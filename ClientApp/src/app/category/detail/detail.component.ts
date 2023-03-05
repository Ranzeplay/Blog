import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryDetail } from 'src/app/models/categoryDetail';

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  categoryName: string;
  routeSubscription!: Subscription;
  content!: CategoryDetail;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.categoryName = '';
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.categoryName = params['id'];

      this.http.get<CategoryDetail>(this.baseUrl + '/Category/Detail/' + this.categoryName).subscribe(val => {
        this.content = val;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
