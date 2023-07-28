import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagDetail } from 'src/app/models/tagDetail';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  tagName: string = '';
  content: TagDetail = TagDetail.newEmpty();

  constructor(
    public route: ActivatedRoute,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tagName = params['id'];

      this.tagService.getTag(this.tagName).subscribe((val) => {
        this.content = val;
      });
    });
  }
}
