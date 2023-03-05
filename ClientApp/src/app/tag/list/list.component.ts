import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TagIndex } from 'src/app/models/tagIndex';

@Component({
  selector: 'app-tag-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  tags: TagIndex[] = [];

  arrowRight = faArrowRight;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  ngOnInit(): void {
    this.http
      .get<TagIndex[]>(this.baseUrl + '/Tag/List/')
      .subscribe((val) => {
        this.tags = val;
      });

  }
}
