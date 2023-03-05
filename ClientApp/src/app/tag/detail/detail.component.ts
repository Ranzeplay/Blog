import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagDetail } from 'src/app/models/tagDetail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  tagName: string;
  routeSubscription!: Subscription;
  content!: TagDetail;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.tagName = '';
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.tagName = params['id'];

      this.http.get<TagDetail>(this.baseUrl + '/Tag/Detail/' + this.tagName).subscribe(val => {
        this.content = val;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
