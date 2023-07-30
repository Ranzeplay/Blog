import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-full-screen-about',
  templateUrl: './full-screen-about.component.html',
  styleUrls: ['./full-screen-about.component.css']
})
export class FullScreenAboutComponent {
  arrowRight = faArrowRight;
}
