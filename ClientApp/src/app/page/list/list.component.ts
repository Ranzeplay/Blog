import { Component } from '@angular/core';
import { PageMetadata } from 'src/app/models/pageMetadata';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  pages: PageMetadata[] = [];

  constructor(
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.pageService.indexPage().subscribe((val) => {
      this.pages = val;
    });
  }
}
