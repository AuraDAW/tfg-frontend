import { TestBed } from '@angular/core/testing';
import { AbilitiesService } from './abilities.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Ability } from '../../models/ability';
import { environment } from '../../../environments/environment';

describe('AbilitiesService', () => {
  let service: AbilitiesService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockAbility: Ability = {
    id: 1,
    name_en: 'Test EN',
    description_en: 'Desc EN',
    name_es: 'Test ES',
    description_es: 'Desc ES',
    entityType: 'ability'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AbilitiesService]
    });
    service = TestBed.inject(AbilitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all abilities', () => {
    const mockAbilities: Ability[] = [mockAbility];
    service.getAbilities().subscribe(abilities => {
      expect(abilities).toEqual(mockAbilities);
    });
    const req = httpMock.expectOne(`${apiUrl}/abilities`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAbilities);
  });

  it('should fetch one ability by id', () => {
    const mockAbilities: Ability[] = [mockAbility];
    service.getAbility(1).subscribe(abilities => {
      expect(abilities).toEqual(mockAbilities);
    });
    const req = httpMock.expectOne(`${apiUrl}/abilities/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAbilities);
  });

  it('should fetch pokemon abilities by id', () => {
    const mockAbilities: Ability[] = [mockAbility];
    service.getPokemonAbilities(1).subscribe(abilities => {
      expect(abilities).toEqual(mockAbilities);
    });
    const req = httpMock.expectOne(`${apiUrl}/abilities/pokemonAbilities/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAbilities);
  });

  it('should post a new ability', () => {
    const newAbility: Ability = {
      id: 2,
      name_en: 'New EN',
      description_en: 'New Desc EN',
      name_es: 'New ES',
      description_es: 'New Desc ES',
      entityType: 'ability'
    };
    const mockResponse = { id: 2 };
    service.postAbility(newAbility).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/abilities`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAbility);
    req.flush(mockResponse);
  });

  it('should update an ability', () => {
    const ability: Ability = {
      id: 1,
      name_en: 'Updated EN',
      description_en: 'Updated Desc EN',
      name_es: 'Updated ES',
      description_es: 'Updated Desc ES',
      entityType: 'ability'
    };
    const mockResponse = { message: 'updated' };
    service.updateAbility(ability).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/abilities/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(ability);
    req.flush(mockResponse);
  });
});
