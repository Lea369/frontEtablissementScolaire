import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClasseComponent } from './search-classe.component';

describe('SearchClasseComponent', () => {
  let component: SearchClasseComponent;
  let fixture: ComponentFixture<SearchClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
