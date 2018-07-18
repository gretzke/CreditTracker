import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdosComponent } from './cdos.component';

describe('CdosComponent', () => {
  let component: CdosComponent;
  let fixture: ComponentFixture<CdosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
