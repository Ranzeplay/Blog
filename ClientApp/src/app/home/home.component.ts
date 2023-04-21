import { Component, OnInit } from '@angular/core';
import { faGit, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { ArticleMetadata } from '../models/articleMetadata';
import { CategoryIndex } from '../models/categoryIndex';
import { TagIndex } from '../models/tagIndex';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faGitHub = faGithub;
  faEnvelope = faEnvelope;
  faYouTube = faYoutube;
  faGit = faGit;
  faGamePad = faGamepad;

  homePageId = '{{ home }}';

  latestArticles: ArticleMetadata[] = [];
  categories: CategoryIndex[] = [];
  tags: TagIndex[] = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.articleService.indexArticles().subscribe(articles => {
      this.latestArticles = articles;
    });

    this.categoryService.indexCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.tagService.indexTags().subscribe(tags => {
      this.tags = tags;
    });
  }
}
