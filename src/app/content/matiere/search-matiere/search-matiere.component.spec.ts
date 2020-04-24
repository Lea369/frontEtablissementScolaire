import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatiereComponent } from './search-matiere.component';

describe('SearchMatiereComponent', () => {
  let component: SearchMatiereComponent;
  let fixture: ComponentFixture<SearchMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
