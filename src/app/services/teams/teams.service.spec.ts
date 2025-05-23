import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { Team } from '../../models/team';
import { environment } from '../../../environments/environment';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockTeam: Team = {
    id: 1,
    name: 'Team Rocket',
    description: 'Steal Pokémon for profit!',
    user_id: 42,
    pokemon_1: 25,
    pokemon_2: 4,
    pokemon_3: 7,
    pokemon_4: 1,
    pokemon_5: 39,
    pokemon_6: 52,
    favorited: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamsService]
    });
    service = TestBed.inject(TeamsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all teams', () => {
    const mockTeams: Team[] = [mockTeam];
    service.getTeams().subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should fetch teams by user id', () => {
    const mockTeams: Team[] = [mockTeam];
    service.getTeamsUser(42).subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/userId/42`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should fetch a team by id', () => {
    const mockTeams: Team[] = [mockTeam];
    service.getTeam(1).subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should post a new team', () => {
    const newTeam: Team = { ...mockTeam, id: 2 };
    const mockResponse = { id: 2 };
    service.postPokemonTeam(newTeam).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTeam);
    req.flush(mockResponse);
  });

  it('should update a team', () => {
    const updatedTeam: Team = { ...mockTeam, name: 'Team Rocket Updated' };
    const mockResponse = { message: 'updated' };
    service.updatePokemonTeam(updatedTeam).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTeam);
    req.flush(mockResponse);
  });

  it('should delete a team', () => {
    const mockResponse = { message: 'deleted' };
    service.deleteTeam(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should add a pokemon to a team', () => {
    const mockResponse = { message: 'added' };
    service.addPokemonToTeam(1, 25).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/addPokemon/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ id: 25 });
    req.flush(mockResponse);
  });

  it('should favorite a team', () => {
    const mockResponse = { message: 'favorited' };
    service.favoriteTeam(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/favoriteTeam/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should check if a team is favorited', () => {
    const mockTeams: Team[] = [{ ...mockTeam, favorited: true }];
    service.isFavorited(1).subscribe(isFav => {
      expect(isFav).toBeTrue();
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should return false if isFavorited errors', () => {
    service.isFavorited(1).subscribe(isFav => {
      expect(isFav).toBeFalse();
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/1`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should fetch favorited teams', () => {
    const mockTeams: Team[] = [mockTeam];
    service.getFavoritedTeams().subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/teams/favoriteTeam`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should handle error', () => {
    service.getTeams().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/teams`);
    req.error(new ErrorEvent('Network error'));
  });
});
