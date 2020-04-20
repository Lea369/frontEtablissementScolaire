import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClasseComponent } from './navbar-classe.component';

describe('NavbarClasseComponent', () => {
  let component: NavbarClasseComponent;
  let fixture: ComponentFixture<NavbarClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
