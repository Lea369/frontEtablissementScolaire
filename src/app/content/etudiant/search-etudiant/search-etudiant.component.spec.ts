import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEtudiantComponent } from './search-etudiant.component';

describe('SearchEtudiantComponent', () => {
  let component: SearchEtudiantComponent;
  let fixture: ComponentFixture<SearchEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
