import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAbilitiesMovesPokemonComponent } from './add-abilities-moves-pokemon.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { MovesService } from '../../services/moves/moves.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';

describe('AddAbilitiesMovesPokemonComponent', () => {
  let component: AddAbilitiesMovesPokemonComponent;
  let fixture: ComponentFixture<AddAbilitiesMovesPokemonComponent>;
  let pokemonDataServiceSpy: jasmine.SpyObj<PokemonDataService>;
  let movesServiceSpy: jasmine.SpyObj<MovesService>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;

  beforeEach(async () => {
    pokemonDataServiceSpy = jasmine.createSpyObj('PokemonDataService', [
      'getPokemonData',
      'addAbilitiesToPokemon',
      'addMovesToPokemon'
    ]);
    movesServiceSpy = jasmine.createSpyObj('MovesService', ['getMoves']);
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getAbilities']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        AddAbilitiesMovesPokemonComponent
      ],
      providers: [
        { provide: PokemonDataService, useValue: pokemonDataServiceSpy },
        { provide: MovesService, useValue: movesServiceSpy },
        { provide: AbilitiesService, useValue: abilitiesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAbilitiesMovesPokemonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data on ngOnInit', () => {
    const mockPokemonData = [{ id: 1 }];
    const mockAbilities = [{ id: 2 }];
    const mockMoves = [{ id: 3 }];

    pokemonDataServiceSpy.getPokemonData.and.returnValue(of(mockPokemonData as any));
    abilitiesServiceSpy.getAbilities.and.returnValue(of(mockAbilities as any));
    movesServiceSpy.getMoves.and.returnValue(of(mockMoves as any));

    component.ngOnInit();

    expect(component.frm).toBeDefined();
    expect(pokemonDataServiceSpy.getPokemonData).toHaveBeenCalled();
    expect(abilitiesServiceSpy.getAbilities).toHaveBeenCalled();
    expect(movesServiceSpy.getMoves).toHaveBeenCalled();
  });

  it('should call addAbilitiesToPokemon and addMovesToPokemon on savePokemon', () => {
    component.frm = component['fb'].group({
      pokemonId: [1],
      abilities: [[2, 3]],
      moves: [[4, 5]]
    });
    pokemonDataServiceSpy.addAbilitiesToPokemon.and.returnValue(of({}));
    pokemonDataServiceSpy.addMovesToPokemon.and.returnValue(of({}));

    component.savePokemon();

    expect(pokemonDataServiceSpy.addAbilitiesToPokemon).toHaveBeenCalledWith([
      { pokemonId: 1, abilityId: 2 },
      { pokemonId: 1, abilityId: 3 }
    ]);
    expect(pokemonDataServiceSpy.addMovesToPokemon).toHaveBeenCalledWith([
      { pokemonId: 1, moveId: 4 },
      { pokemonId: 1, moveId: 5 }
    ]);
  });

  it('should handle errors in loadData', () => {
    spyOn(console, 'log');
    pokemonDataServiceSpy.getPokemonData.and.returnValue(throwError(() => new Error('fail')));
    abilitiesServiceSpy.getAbilities.and.returnValue(throwError(() => new Error('fail')));
    movesServiceSpy.getMoves.and.returnValue(throwError(() => new Error('fail')));

    component['loadData']();

    expect(console.log).toHaveBeenCalled();
  });

  it('should handle errors in savePokemon', () => {
    spyOn(console, 'log');
    component.frm = component['fb'].group({
      pokemonId: [1],
      abilities: [[2]],
      moves: [[3]]
    });
    pokemonDataServiceSpy.addAbilitiesToPokemon.and.returnValue(throwError(() => new Error('fail')));
    pokemonDataServiceSpy.addMovesToPokemon.and.returnValue(throwError(() => new Error('fail')));

    component.savePokemon();

    expect(console.log).toHaveBeenCalled();
  });
});
