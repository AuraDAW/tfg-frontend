import { PokemonPathPipe } from './pokemon-path.pipe';

describe('PokemonPathPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonPathPipe();
    expect(pipe).toBeTruthy();
  });
});
