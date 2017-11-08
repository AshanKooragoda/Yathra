import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanceComponent } from './expance.component';

describe('ExpanceComponent', () => {
  let component: ExpanceComponent;
  let fixture: ComponentFixture<ExpanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
