import { Component, OnInit } from '@angular/core';
import { faGit, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  faGitHub = faGithub;
  faEnvelope = faEnvelope;
  faYouTube = faYoutube;
  faGit = faGit;
  faGamePad = faGamepad;

  homePageId = '{{ home }}';
}
