import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMatiereComponent } from './navbar-matiere.component';

describe('NavbarMatiereComponent', () => {
  let component: NavbarMatiereComponent;
  let fixture: ComponentFixture<NavbarMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
