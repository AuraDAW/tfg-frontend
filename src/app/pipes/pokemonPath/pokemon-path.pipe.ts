import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'pokemonPath'
})
export class PokemonPathPipe implements PipeTransform {

  transform(fileName: string): string {
    if(!fileName){
      // if fileName does not exist, return empty string
      return "";
    }
    return `${environment.pokemonBasePath}${fileName}`;
  }

}
