import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ArticleReadComponent } from './article/read/read.component';
import { ArticleViewComponent } from './article/view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleListComponent } from './article/list/list.component';
import { ArticleCardComponent } from './article/card/card.component';
import { CategoryListComponent as CategoryListComponent } from './category/list/list.component';
import { DetailComponent as CategoryDetailComponent } from './category/detail/detail.component';
import { ListComponent as TagListComponent } from './tag/list/list.component';
import { DetailComponent as TagDetailComponent } from './tag/detail/detail.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ArticleReadComponent,
    ArticleViewComponent,
    ArticleListComponent,
    ArticleCardComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    TagListComponent,
    TagDetailComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'article/read/:id', component: ArticleReadComponent },
      { path: 'article/list', component: ArticleListComponent },
      { path: 'category/list', component: CategoryListComponent },
      { path: 'category/detail/:id', component: CategoryDetailComponent },
      { path: 'tag/list', component: TagListComponent },
      { path: 'tag/detail/:id', component: TagDetailComponent },
    ]),
    NgxScrollTopModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
