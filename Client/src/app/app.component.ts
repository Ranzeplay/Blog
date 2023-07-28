import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'app';
  arrowUp = faArrowUp;

  displayOutline = true;

  constructor(location: Location){
    location.onUrlChange((url, _) => {
      this.displayOutline = (url != "/about");
    })
  }

  bttClassList =
    'fixed inline-block \
    p-3 bg-red-600 text-white \
    font-medium text-xs \
    leading-tight uppercase \
    rounded-full shadow-md \
    hover:bg-red-700 hover:shadow-lg \
    focus:bg-red-700 focus:shadow-lg \
    focus:outline-none focus:ring-0 \
    active:bg-red-800 active:shadow-lg \
    transition duration-150 ease-in-out \
    bottom-5 right-5';
}
