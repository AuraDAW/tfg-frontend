import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  public frm!:FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
      //si no existe data (estamos intentando crear un equipo) mostramos formulario sin valores por defecto
    this.frm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
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
