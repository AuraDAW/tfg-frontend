import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, TranslateModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  public frm!:FormGroup;

  private serviceAuth = inject(AuthService)
  private router = inject(Router)

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
  get emailWrongFormat(){
    return this.frm.get('email')?.errors?.['email']
  } 
  get passwordNotRequired(){
    return this.frm.get('password')?.errors?.['required'] && this.frm.get('password')?.touched
  }

  login(){
    const user:User={
      email: this.frm.get("email")?.value,
      password: this.frm.get("password")?.value
    }
    console.log(user);
    this.serviceAuth.login(user).subscribe({
      next:(data)=>{
        console.log("logeado");
        this.router.navigateByUrl("/home")
      },
      error:(error)=>{
        Swal.fire(`${error.error.message}`,"","error");
      }
    })
  }
  
}
