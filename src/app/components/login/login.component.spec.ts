import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    component.frm.setValue({ email: '', password: '' });
    expect(component.frm.invalid).toBeTrue();
  });

  it('should show required error for email when touched and empty', () => {
    const emailControl = component.frm.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.emailNotRequired).toBeTrue();
  });

  it('should show email format error for invalid email', () => {
    const emailControl = component.frm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.emailWrongFormat).toBeTrue();
  });

  it('should show required error for password when touched and empty', () => {
    const passwordControl = component.frm.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.passwordNotRequired).toBeTrue();
  });

  it('should call AuthService.login and navigate on success', () => {
    authServiceSpy.login.and.returnValue(of({ idToken: 'token', expiresIn: 3600 }));
    component.frm.setValue({ email: 'test@example.com', password: '123456' });
    component.login();
    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' });
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should show error alert on login failure', () => {
    spyOn(Swal, 'fire');
    authServiceSpy.login.and.returnValue(throwError(() => ({
      error: { message: 'Invalid credentials' }
    })));
    component.frm.setValue({ email: 'test@example.com', password: 'wrong' });
    component.login();
    expect(Swal.fire).toHaveBeenCalledWith('Invalid credentials', '', 'error');
  });

  it('should render translated labels and button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('login.login');
    expect(compiled.textContent).toContain('login.email');
    expect(compiled.textContent).toContain('login.password');
    expect(compiled.textContent).toContain('login.text');
    expect(compiled.textContent).toContain('login.link');
  });
});
