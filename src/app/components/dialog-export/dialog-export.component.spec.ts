import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogExportComponent } from './dialog-export.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('DialogExportComponent', () => {
  let component: DialogExportComponent;
  let fixture: ComponentFixture<DialogExportComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogExportComponent>>;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        DialogExportComponent,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: ['Line 1', 'Line 2'] },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dialog title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Exported Team');
  });

  it('should render arrayTest items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Line 1');
    expect(compiled.textContent).toContain('Line 2');
  });

  it('should call copyClipboard and show snackbar on success', async () => {
    // Mock clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.resolve() },
      configurable: true
    });
    const element = fixture.debugElement.query(By.css('div')).nativeElement;
    await component.copyClipboard(element);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Copied to clipboard!', 'Dismiss', { duration: 3000 });
  });

  it('should call copyClipboard and show snackbar on failure', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject() },
      configurable: true
    });
    const element = fixture.debugElement.query(By.css('div')).nativeElement;
    await component.copyClipboard(element);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Failed to copy.', 'Dismiss', { duration: 3000 });
  });
});
