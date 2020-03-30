import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEtudiantComponent } from './absence-etudiant.component';

describe('AbsenceEtudiantComponent', () => {
  let component: AbsenceEtudiantComponent;
  let fixture: ComponentFixture<AbsenceEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
