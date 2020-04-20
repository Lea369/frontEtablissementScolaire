import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAbsenceComponent } from './navbar-absence.component';

describe('NavbarAbsenceComponent', () => {
  let component: NavbarAbsenceComponent;
  let fixture: ComponentFixture<NavbarAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
