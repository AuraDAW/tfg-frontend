import { TestBed } from '@angular/core/testing';
import { MovesService } from './moves.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Move } from '../../models/move';
import { environment } from '../../../environments/environment';

describe('MovesService', () => {
  let service: MovesService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockMove: Move = {
    id: 1,
    name_en: 'Tackle',
    description_en: 'A physical attack',
    type: 1,
    power: 40,
    accuracy: 100,
    name_es: 'Placaje',
    description_es: 'Un ataque físico',
    entityType: 'move'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovesService]
    });
    service = TestBed.inject(MovesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all moves', () => {
    const mockMoves: Move[] = [mockMove];
    service.getMoves().subscribe(moves => {
      expect(moves).toEqual(mockMoves);
    });
    const req = httpMock.expectOne(`${apiUrl}/moves`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMoves);
  });

  it('should fetch a move by id', () => {
    const mockMoves: Move[] = [mockMove];
    service.getMove(1).subscribe(moves => {
      expect(moves).toEqual(mockMoves);
    });
    const req = httpMock.expectOne(`${apiUrl}/moves/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMoves);
  });

  it('should fetch pokemon moves by id', () => {
    const mockMoves: Move[] = [mockMove];
    service.getPokemonMoves(1).subscribe(moves => {
      expect(moves).toEqual(mockMoves);
    });
    const req = httpMock.expectOne(`${apiUrl}/moves/pokemonMoves/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMoves);
  });

  it('should post a new move', () => {
    const newMove: Move = {
      id: 2,
      name_en: 'Thunderbolt',
      description_en: 'A strong electric attack',
      type: 2,
      power: 90,
      accuracy: 100,
      name_es: 'Rayo',
      description_es: 'Un fuerte ataque eléctrico',
      entityType: 'move'
    };
    const mockResponse = { id: 2 };
    service.postMove(newMove).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/moves`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMove);
    req.flush(mockResponse);
  });

  it('should update a move', () => {
    const updatedMove: Move = {
      ...mockMove,
      name_en: 'Tackle Updated'
    };
    const mockResponse = { message: 'updated' };
    service.updateMove(updatedMove).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/moves/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedMove);
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    service.getMoves().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error?.message?.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/i);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/moves`);
    req.error(new ErrorEvent('Network error'));
  });
});
