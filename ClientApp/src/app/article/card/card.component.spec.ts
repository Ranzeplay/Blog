import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
