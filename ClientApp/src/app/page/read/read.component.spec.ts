import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReadComponent } from './read.component';

describe('ReadComponent', () => {
  let component: PageReadComponent;
  let fixture: ComponentFixture<PageReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
