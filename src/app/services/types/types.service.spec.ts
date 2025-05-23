import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TypesService } from './types.service';
import { Type } from '../../models/type';
import { environment } from '../../../environments/environment';

describe('TypesService', () => {
  let service: TypesService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockType: Type = {
    id: 1,
    name_en: 'Fire',
    image: 'fire.png',
    image_small: 'fire_small.png',
    name_es: 'Fuego'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TypesService]
    });
    service = TestBed.inject(TypesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all types', () => {
    const mockTypes: Type[] = [mockType];
    service.getTypes().subscribe(types => {
      expect(types).toEqual(mockTypes);
    });
    const req = httpMock.expectOne(`${apiUrl}/types`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTypes);
  });

  it('should fetch a type by id', () => {
    service.getType(1).subscribe(type => {
      expect(type).toEqual(mockType);
    });
    const req = httpMock.expectOne(`${apiUrl}/types/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockType);
  });

  it('should fetch all types of a pokemonData', () => {
    const mockTypes: Type[] = [mockType];
    service.getPokemonDataTypes(1).subscribe(types => {
      expect(types).toEqual(mockTypes);
    });
    const req = httpMock.expectOne(`${apiUrl}/types/getTypes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTypes);
  });

  it('should handle error', () => {
    service.getTypes().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/types`);
    req.error(new ErrorEvent('Network error'));
  });
});
