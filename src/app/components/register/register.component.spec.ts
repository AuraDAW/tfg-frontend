import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    component.frm.setValue({ username: '', email: '', password: '' });
    expect(component.frm.invalid).toBeTrue();
  });

  it('should show required error for username when touched and empty', () => {
    const usernameControl = component.frm.get('username');
    usernameControl?.setValue('');
    usernameControl?.markAsTouched();
    fixture.detectChanges();
    expect(component.nameNotRequired).toBeTrue();
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

  it('should call AuthService.register and navigate on success', () => {
    authServiceSpy.register.and.returnValue(of({ id: 1 }));
    component.frm.setValue({ username: 'test', email: 'test@example.com', password: '123456' });
    component.register();
    expect(authServiceSpy.register).toHaveBeenCalledWith({
      username: 'test',
      email: 'test@example.com',
      password: '123456'
    });
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should show error alert on register failure', () => {
    spyOn(Swal, 'fire');
    authServiceSpy.register.and.returnValue(throwError(() => ({
      error: { message: 'Email already exists' }
    })));
    component.frm.setValue({ username: 'test', email: 'test@example.com', password: '123456' });
    component.register();
    expect(Swal.fire).toHaveBeenCalledWith('Email already exists', '', 'error');
  });

  it('should render translated labels and button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('register.register');
    expect(compiled.textContent).toContain('register.name');
    expect(compiled.textContent).toContain('register.email');
    expect(compiled.textContent).toContain('register.password');
    expect(compiled.textContent).toContain('register.text');
    expect(compiled.textContent).toContain('register.link');
  });
});
