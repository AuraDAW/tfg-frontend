import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  public frm!:FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
      //si no existe data (estamos intentando crear un equipo) mostramos formulario sin valores por defecto
    this.frm = this.fb.group({
      name:["",[Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
}
  get nameNotRequired(){
    return this.frm.get('email')?.errors?.['required'] && this.frm.get('email')?.touched
  }
  get nameWrongLength(){
    return this.frm.get('email')?.errors?.['email']
  }
  get emailNotRequired(){
    return this.frm.get('email')?.errors?.['required'] && this.frm.get('email')?.touched
  }
  get emailNotEmail(){
    return this.frm.get('email')?.errors?.['email']
  } 
  get passwordNotRequired(){
    return this.frm.get('password')?.errors?.['required'] && this.frm.get('password')?.touched
  }
}
