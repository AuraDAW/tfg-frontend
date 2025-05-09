import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, TranslateModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  public frm!:FormGroup;
  private serviceAuth = inject(AuthService)
  private router = inject(Router)
  constructor(
    private fb: FormBuilder,
  ) {
    this.frm = this.fb.group({
      username:["",[Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
}
  get nameNotRequired(){
    return this.frm.get('username')?.errors?.['required'] && this.frm.get('username')?.touched
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
  
  /**
   * @description Obtains data from the form, creates a User object with it and calls to serviceAuth.register(user) to create a new user
   * After creating user, it redirects to login.
   */
  register() {
    const user: User = {
      username:this.frm.get("username")?.value,
      email: this.frm.get("email")?.value,
      password: this.frm.get("password")?.value
    }
    console.log(user);
    this.serviceAuth.register(user).subscribe({
      next: (data) => {
        console.log("registrado");
        this.router.navigateByUrl("/login")
      },
      error: (err) => {
        Swal.fire(`${err.error.message}`,"","error")
      }
    })
  }

}
