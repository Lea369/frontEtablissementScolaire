import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClasseComponent } from './detail-classe.component';

describe('DetailClasseComponent', () => {
  let component: DetailClasseComponent;
  let fixture: ComponentFixture<DetailClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
