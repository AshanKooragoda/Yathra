import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedetailComponent } from './invoicedetail.component';

describe('InvoicedetailComponent', () => {
  let component: InvoicedetailComponent;
  let fixture: ComponentFixture<InvoicedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
