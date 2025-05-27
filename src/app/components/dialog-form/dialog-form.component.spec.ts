import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogFormComponent } from './dialog-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('DialogFormComponent', () => {
  let component: DialogFormComponent;
  let fixture: ComponentFixture<DialogFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogFormComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        DialogFormComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values if no data is provided', () => {
    expect(component.frm.get('name')?.value).toBe('');
    expect(component.frm.get('description')?.value).toBe('');
  });

  it('should initialize form with provided data', () => {
    const testData = { name: 'Test Team', description: 'Test Description' };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        DialogFormComponent,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: testData }
      ]
    }).compileComponents();

    const testFixture = TestBed.createComponent(DialogFormComponent);
    const testComponent = testFixture.componentInstance;
    testFixture.detectChanges();

    expect(testComponent.frm.get('name')?.value).toBe('Test Team');
    expect(testComponent.frm.get('description')?.value).toBe('Test Description');
  });

  it('should show required error when name is empty and touched', () => {
    const nameControl = component.frm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.nameNotRequired).toBeTrue();
  });

  it('should show minlength error when name is too short', () => {
    const nameControl = component.frm.get('name');
    nameControl?.setValue('abc');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.nameWrongLength).toBeTruthy();
  });

  it('should show maxlength error when name is too long', () => {
    const nameControl = component.frm.get('name');
    nameControl?.setValue('a'.repeat(51));
    nameControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.nameWrongLength).toBeTruthy();
  });

  it('should show required error when description is empty and touched', () => {
    const descControl = component.frm.get('description');
    descControl?.setValue('');
    descControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.descriptionNotRequired).toBeTruthy();
  });

  it('should show minlength error when description is too short', () => {
    const descControl = component.frm.get('description');
    descControl?.setValue('abc');
    descControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.descriptionWrongLength).toBeTruthy();
  });

  it('should show maxlength error when description is too long', () => {
    const descControl = component.frm.get('description');
    descControl?.setValue('a'.repeat(151));
    descControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.descriptionWrongLength).toBeTruthy();
  });

  it('should call dialogRef.close() on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call dialogRef.close() with form value on submit', () => {
    component.frm.setValue({ name: 'Test', description: 'Desc' });
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ name: 'Test', description: 'Desc' });
  });

  it('should render translated labels and buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('dialog.title');
    expect(compiled.textContent).toContain('dialog.name');
    expect(compiled.textContent).toContain('dialog.description');
    expect(compiled.textContent).toContain('dialog.cancel');
    expect(compiled.textContent).toContain('dialog.submit');
  });
});
