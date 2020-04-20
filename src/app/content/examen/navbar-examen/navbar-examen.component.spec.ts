import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarExamenComponent } from './navbar-examen.component';

describe('NavbarExamenComponent', () => {
  let component: NavbarExamenComponent;
  let fixture: ComponentFixture<NavbarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
