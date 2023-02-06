import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReadComponent } from './read.component';

describe('ReadComponent', () => {
  let component: ArticleReadComponent;
  let fixture: ComponentFixture<ArticleReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
