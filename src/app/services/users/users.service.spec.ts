import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockUser: User = {
    id: 1,
    username: 'ash',
    email: 'ash@poke.com',
    password: 'pikachu',
    role: 1,
    entityType: 'user'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [mockUser];
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a user by id', () => {
    service.getUser(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${apiUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch a team creator by team id', () => {
    service.getTeamCreator(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${apiUrl}/users/teamCreator/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should handle error', () => {
    service.getUsers().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/users`);
    req.error(new ErrorEvent('Network error'));
  });
});
