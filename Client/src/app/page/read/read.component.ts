import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-page-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class PageReadComponent {
  pageId: string = '';
  content: Page = Page.newEmpty();
  text: string = '';

  constructor(
    public route: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageId = params['id'];

      this.pageService.getPage(this.pageId).subscribe((val) => {
        this.content = val;
        this.text = val.content;
      });
    });
  }
}
