import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDialogComponent } from './bio-dialog.component';

describe('BioDialogComponent', () => {
  let component: BioDialogComponent;
  let fixture: ComponentFixture<BioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
