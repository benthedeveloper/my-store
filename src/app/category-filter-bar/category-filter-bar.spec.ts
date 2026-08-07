import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterBar } from './category-filter-bar';

describe('CategoryFilterBar', () => {
  let component: CategoryFilterBar;
  let fixture: ComponentFixture<CategoryFilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterBar],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
