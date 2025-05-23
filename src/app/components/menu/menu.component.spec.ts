import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout', 'startTokenExpirationWatcher'], {
      isLoggedIn$: of(true),
      role$: of(2)
    });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot(), MenuComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar brand', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Pokemon TFC');
  });

  it('should call openDialog when help is clicked', () => {
    component.openDialog();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should call logout on service and navigate', () => {
    spyOn(component['router'], 'navigateByUrl');
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should toggle language and update localStorage', () => {
    component.toggleLanguage(true);
    expect(component.language).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
    component.toggleLanguage(false);
    expect(component.language).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
  });
});
