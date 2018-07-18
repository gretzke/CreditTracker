import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCdoDialogComponent } from './create-cdo-dialog.component';

describe('CreateCdoDialogComponent', () => {
  let component: CreateCdoDialogComponent;
  let fixture: ComponentFixture<CreateCdoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCdoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCdoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
