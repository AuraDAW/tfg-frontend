import { TestBed } from '@angular/core/testing';

import { PokemonTeamService } from './pokemon-team.service';

describe('PokemonTeamService', () => {
  let service: PokemonTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
