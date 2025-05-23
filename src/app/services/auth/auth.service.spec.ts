import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set session', () => {
    const user: User = { email: 'test@test.com', password: '123456' } as User;
    const mockResponse = { idToken: 'fake-jwt-token', expiresIn: 3600 };

    spyOn<any>(service, 'setSession').and.callThrough();

    service.login(user).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect((service as any).setSession).toHaveBeenCalledWith(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register a user', () => {
    const user: User = { email: 'test@test.com', password: '123456' } as User;
    const mockResponse = { id: 1 };

    service.register(user).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush(mockResponse);
  });

  it('should set and clear session on login/logout', () => {
    const authResult = { idToken: 'token', expiresIn: 1000 };
    (service as any).setSession(authResult);

    expect(localStorage.getItem('id_token')).toBe('token');
    expect(localStorage.getItem('expires_at')).not.toBeNull();

    service.logout();
    expect(localStorage.getItem('id_token')).toBeNull();
    expect(localStorage.getItem('expires_at')).toBeNull();
  });

  it('should return false for isLoggedIn if no token', () => {
    localStorage.removeItem('id_token');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return true for isLoggedIn if token exists and not expired', () => {
    localStorage.setItem('id_token', 'token');
    const future = Date.now() + 10000;
    localStorage.setItem('expires_at', JSON.stringify(future));
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false for isLoggedIn if token expired', () => {
    localStorage.setItem('id_token', 'token');
    const past = Date.now() - 10000;
    localStorage.setItem('expires_at', JSON.stringify(past));
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should get userId and role from token', () => {
    // Create a fake JWT payload and encode it as base64
    const payload = {
      userId: 42,
      role: 2,
      createTo: '',
      iat: 0,
      exp: 0
    };
    const base64Payload = btoa(JSON.stringify(payload));
    const fakeToken = `header.${base64Payload}.signature`;
    localStorage.setItem('id_token', fakeToken);

    expect(service.getUserIdFromToken()).toBe(42);
    expect(service.getRoleFromToken()).toBe(2);
  });

  it('should handle error', () => {
    const error = { error: new ErrorEvent('Client error', { message: 'fail' }) } as any;
    const result = (service as any).handleError(error);
    expect(result).toBeTruthy();
  });
});
