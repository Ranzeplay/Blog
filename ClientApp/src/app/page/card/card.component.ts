import { Component, Input } from '@angular/core';
import { PageMetadata } from 'src/app/models/pageMetadata';

@Component({
  selector: 'app-page-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class PageCardComponent {
  @Input() metadata: PageMetadata = PageMetadata.newEmpty();
}
