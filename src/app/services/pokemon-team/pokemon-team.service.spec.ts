import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonTeamService } from './pokemon-team.service';
import { PokemonTeam } from '../../models/pokemon-team';
import { environment } from '../../../environments/environment';

describe('PokemonTeamService', () => {
  let service: PokemonTeamService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockTeam: PokemonTeam = {
    id: 1,
    id_pokemon: 25,
    move_1: 1,
    move_2: 2,
    move_3: 3,
    move_4: 4,
    ability: 1,
    item: 1,
    iv_atk: 31,
    iv_spatk: 31,
    iv_def: 31,
    iv_spdef: 31,
    iv_spd: 31,
    iv_hp: 31,
    ev_atk: 252,
    ev_spatk: 0,
    ev_def: 0,
    ev_spdef: 0,
    ev_spd: 252,
    ev_hp: 4,
    is_shiny: false,
    tera_type: 13,
    level: 50
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonTeamService]
    });
    service = TestBed.inject(PokemonTeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pokemon teams', () => {
    const mockTeams: PokemonTeam[] = [mockTeam];
    service.getAllPokemonTeam().subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonTeam`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should fetch a pokemon team by id', () => {
    const mockTeams: PokemonTeam[] = [mockTeam];
    service.getPokemonTeamId(1).subscribe(teams => {
      expect(teams).toEqual(mockTeams);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonTeam/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should post a new pokemon team', () => {
    const newTeam: PokemonTeam = { ...mockTeam, id: 2 };
    const mockResponse = { id: 2 };
    service.postPokemonTeam(newTeam).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonTeam`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTeam);
    req.flush(mockResponse);
  });

  it('should update a pokemon team', () => {
    const updatedTeam: PokemonTeam = { ...mockTeam, level: 100 };
    const mockResponse = { message: 'updated' };
    service.updatePokemonTeam(updatedTeam).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonTeam/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTeam);
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    service.getAllPokemonTeam().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonTeam`);
    req.error(new ErrorEvent('Network error'));
  });
});
