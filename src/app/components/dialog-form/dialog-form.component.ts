import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from '../../services/teams/teams.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-form',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-form.component.html',
  styles: ``
})
export class DialogFormComponent {
  public frm:FormGroup;
  // private fb=inject(FormBuilder)
  // private dialogRef!: MatDialogRef<DialogFormComponent>

  // private serviceTeams = inject(TeamsService)

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormComponent>
  ) {
    this.frm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    });
  }

  get nameNotRequired(){
    return this.frm.get('name')?.errors?.['required'] && this.frm.get('name')?.touched
  }
  get nameWrongLength(){
    return this.frm.get('name')?.errors?.['minlength'] || this.frm.get('name')?.errors?.['maxlength']
  } 
  get descriptionNotRequired(){
    return this.frm.get('description')?.errors?.['required'] && this.frm.get('description')?.touched
  }
  get descriptionWrongLength(){
    return this.frm.get('description')?.errors?.['minlength'] || this.frm.get('description')?.errors?.['maxlength']
  } 

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // close dialog + send the form data so team-manager can subscribe to it and manipulate the result of the form
    this.dialogRef.close(this.frm.value);
  }
}
