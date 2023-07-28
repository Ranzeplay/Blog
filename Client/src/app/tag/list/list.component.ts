import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TagIndex } from 'src/app/models/tagIndex';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  tags: TagIndex[] = [];

  arrowRight = faArrowRight;

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.indexTags().subscribe((val) => {
      this.tags = val;
    });
  }
}
