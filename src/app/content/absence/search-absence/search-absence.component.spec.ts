import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAbsenceComponent } from './search-absence.component';

describe('SearchAbsenceComponent', () => {
  let component: SearchAbsenceComponent;
  let fixture: ComponentFixture<SearchAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
