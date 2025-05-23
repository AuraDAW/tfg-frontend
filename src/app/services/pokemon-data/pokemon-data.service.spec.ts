import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonDataService } from './pokemon-data.service';
import { PokemonData } from '../../models/pokemon-data';
import { environment } from '../../../environments/environment';

describe('PokemonDataService', () => {
  let service: PokemonDataService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockPokemon: PokemonData = {
    id: 1,
    pokedex_id: 25,
    name_en: 'Pikachu',
    image: 'pikachu.png',
    image_shiny: 'pikachu_shiny.png',
    type: 13,
    type_2: 0,
    base_atk: 55,
    base_spatk: 50,
    base_def: 40,
    base_spdef: 50,
    base_spd: 90,
    base_hp: 35,
    name_es: 'Pikachu',
    entityType: 'pokemonData'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonDataService]
    });
    service = TestBed.inject(PokemonDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all pokemon data', () => {
    const mockPokemons: PokemonData[] = [mockPokemon];
    service.getPokemonData().subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);
  });

  it('should fetch pokemon data by id', () => {
    const mockPokemons: PokemonData[] = [mockPokemon];
    service.getPokemonDataId(1).subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);
  });

  it('should fetch pokemon data from team', () => {
    const mockPokemons: PokemonData[] = [mockPokemon];
    service.getPokemonDataFromTeam(1).subscribe(pokemons => {
      expect(pokemons).toEqual(mockPokemons);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData/getData/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemons);
  });

  it('should post new pokemon data', () => {
    const formData = new FormData();
    formData.append('pokedex_id', '26');
    formData.append('name_en', 'Raichu');
    formData.append('image', 'raichu.png');
    formData.append('image_shiny', 'raichu_shiny.png');
    formData.append('type', '13');
    formData.append('type_2', '0');
    formData.append('base_atk', '90');
    formData.append('base_spatk', '90');
    formData.append('base_def', '55');
    formData.append('base_spdef', '80');
    formData.append('base_spd', '110');
    formData.append('base_hp', '60');
    formData.append('name_es', 'Raichu');
    formData.append('entityType', 'pokemonData');

    const mockResponse = { id: 2 };
    service.postPokemonData(formData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(mockResponse);
  });

  it('should update pokemon data', () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('name_en', 'Pikachu Updated');
    // ...add other fields as needed

    const mockResponse = { message: 'updated' };
    service.updatePokemonData(formData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(formData);
    req.flush(mockResponse);
  });

  it('should add abilities to pokemon', () => {
    const abilities = [{ pokemon_id: 1, ability_id: 1 }];
    const mockResponse = { message: 'abilities added' };
    service.addAbilitiesToPokemon(abilities as any).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData/addAbilities`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(abilities);
    req.flush(mockResponse);
  });

  it('should add moves to pokemon', () => {
    const moves = [{ pokemon_id: 1, move_id: 1 }];
    const mockResponse = { message: 'moves added' };
    service.addMovesToPokemon(moves as any).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData/addMoves`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(moves);
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    service.getPokemonData().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/pokemonData`);
    req.error(new ErrorEvent('Network error'));
  });
});
