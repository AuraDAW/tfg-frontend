import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormComponent } from './dialog-form.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('DialogFormComponent', () => {
  let component: DialogFormComponent;
  let fixture: ComponentFixture<DialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormComponent, MatDialogRef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
