import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNoteComponent } from './navbar-note.component';

describe('NavbarNoteComponent', () => {
  let component: NavbarNoteComponent;
  let fixture: ComponentFixture<NavbarNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
