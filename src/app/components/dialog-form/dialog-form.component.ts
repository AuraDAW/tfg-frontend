import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from '../../services/teams/teams.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-form',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, TranslateModule],
  templateUrl: './dialog-form.component.html',
  styles: ``
})
export class DialogFormComponent {
  public frm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(!data){
      // if data does not exist, we are trying to create a new team so we dont display any default values
    this.frm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    });
  }else{
    // if data exists we are trying to edit a team, so we display the team's name and description as default values
    this.frm = this.fb.group({
      name: [data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [data.description, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    });
  }
}

  // Methods that will execute when the following form element has a validation error.
  // They return true or false so we can show error messages in the HTML. 
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

  /**
   * @description Executes when pressing the "cancel" button on dialog. It will simply close it.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * @description Executes when submitting the dialog. It will close it + send the form data to whatever other component
   * created the dialog, so we can use the form data to manipulate the DB.
   */
  onSubmit(): void {
    this.dialogRef.close(this.frm.value);
  }
}
