import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEtudiantComponent } from './note-etudiant.component';

describe('NoteEtudiantComponent', () => {
  let component: NoteEtudiantComponent;
  let fixture: ComponentFixture<NoteEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
