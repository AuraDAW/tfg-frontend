import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFrmComponent } from './pokemon-frm.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TypesService } from '../../services/types/types.service';
import { ItemsService } from '../../services/items/items.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { MovesService } from '../../services/moves/moves.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import { TeamsService } from '../../services/teams/teams.service';
import { TranslateModule } from '@ngx-translate/core';

describe('PokemonFrmComponent', () => {
  let component: PokemonFrmComponent;
  let fixture: ComponentFixture<PokemonFrmComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;
  let typesServiceSpy: jasmine.SpyObj<TypesService>;
  let itemsServiceSpy: jasmine.SpyObj<ItemsService>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;
  let movesServiceSpy: jasmine.SpyObj<MovesService>;
  let pokemonDataServiceSpy: jasmine.SpyObj<PokemonDataService>;
  let pokemonTeamServiceSpy: jasmine.SpyObj<PokemonTeamService>;
  let teamsServiceSpy: jasmine.SpyObj<TeamsService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => {
          if (key === 'teamId') return '1';
          if (key === 'id') return null;
          return null;
        }
      })
    };
    typesServiceSpy = jasmine.createSpyObj('TypesService', ['getTypes', 'getPokemonDataTypes']);
    itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getItems']);
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getPokemonAbilities']);
    movesServiceSpy = jasmine.createSpyObj('MovesService', ['getPokemonMoves']);
    pokemonDataServiceSpy = jasmine.createSpyObj('PokemonDataService', ['getPokemonData', 'getPokemonDataId']);
    pokemonTeamServiceSpy = jasmine.createSpyObj('PokemonTeamService', ['getPokemonTeamId', 'postPokemonTeam', 'updatePokemonTeam']);
    teamsServiceSpy = jasmine.createSpyObj('TeamsService', ['addPokemonToTeam']);
    pokemonDataServiceSpy.getPokemonData.and.returnValue(of([]));
    pokemonDataServiceSpy.getPokemonDataId.and.returnValue(of([])); // <-- Add this line

    await TestBed.configureTestingModule({
      imports: [PokemonFrmComponent, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: TypesService, useValue: typesServiceSpy },
        { provide: ItemsService, useValue: itemsServiceSpy },
        { provide: AbilitiesService, useValue: abilitiesServiceSpy },
        { provide: MovesService, useValue: movesServiceSpy },
        { provide: PokemonDataService, useValue: pokemonDataServiceSpy },
        { provide: PokemonTeamService, useValue: pokemonTeamServiceSpy },
        { provide: TeamsService, useValue: teamsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFrmComponent);
    component = fixture.componentInstance;

    // Default spies for initial load
    typesServiceSpy.getTypes.and.returnValue(of([]));
    itemsServiceSpy.getItems.and.returnValue(of([]));
    pokemonDataServiceSpy.getPokemonData.and.returnValue(of([]));
    pokemonDataServiceSpy.getPokemonDataId.and.returnValue(of([]));
    abilitiesServiceSpy.getPokemonAbilities.and.returnValue(of([]));
    movesServiceSpy.getPokemonMoves.and.returnValue(of([]));
    pokemonTeamServiceSpy.getPokemonTeamId.and.returnValue(of([]));
    pokemonTeamServiceSpy.postPokemonTeam.and.returnValue(of({ id: 1 }));
    pokemonTeamServiceSpy.updatePokemonTeam.and.returnValue(of({ message: 'updated' }));
    teamsServiceSpy.addPokemonToTeam.and.returnValue(of({ message: 'added' }));
    typesServiceSpy.getPokemonDataTypes.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtainTypes, obtainItems, and obtainAllPokemonData on init', () => {
    expect(typesServiceSpy.getTypes).toHaveBeenCalled();
    expect(itemsServiceSpy.getItems).toHaveBeenCalled();
    expect(pokemonDataServiceSpy.getPokemonData).toHaveBeenCalled();
  });

  it('should validate EV total does not exceed 510', () => {
    component.frm.patchValue({
      evhp: 252,
      evatk: 252,
      evdef: 10
    });
    expect(component.frm.errors?.['evTotalExceeded']).toBeTrue();
  });

  it('should validate duplicate moves', () => {
    component.frm.patchValue({
      move1: 1,
      move2: 1,
      move3: 2,
      move4: 3
    });
    expect(component.frm.errors?.['duplicateMoves']).toBeTrue();
  });

  it('should call router.navigateByUrl after adding a pokemon', () => {
    // Arrange
    const pokemonTeam = {
      id: undefined,
      id_pokemon: 1,
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
      ev_atk: 0,
      ev_spatk: 0,
      ev_def: 0,
      ev_spdef: 0,
      ev_spd: 0,
      ev_hp: 0,
      is_shiny: false,
      tera_type: 1,
      level: 50
    };
    component.teamId = 1;
    pokemonTeamServiceSpy.postPokemonTeam.and.returnValue(of({ id: 123 }));
    teamsServiceSpy.addPokemonToTeam.and.returnValue(of({ message: 'added' }));
    component.frm.patchValue({
      pokemonId: 1, ability: 1, item: 1, level: 50, teratype: 1, isShiny: false,
      move1: 1, move2: 2, move3: 3, move4: 4,
      evhp: 0, evatk: 0, evdef: 0, evspatk: 0, evspdef: 0, evspd: 0,
      ivhp: 31, ivatk: 31, ivdef: 31, ivspatk: 31, ivspdef: 31, ivspd: 31
    });
    // Act
    component.savePokemon();
    // Assert
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/teamBuilder/1/1');
  });

  it('should call router.navigateByUrl after updating a pokemon', () => {
    // Arrange
    component.id = 123;
    component.teamId = 1;
    pokemonTeamServiceSpy.updatePokemonTeam.and.returnValue(of({ message: 'updated' }));
    component.frm.patchValue({
      pokemonId: 1, ability: 1, item: 1, level: 50, teratype: 1, isShiny: false,
      move1: 1, move2: 2, move3: 3, move4: 4,
      evhp: 0, evatk: 0, evdef: 0, evspatk: 0, evspdef: 0, evspd: 0,
      ivhp: 31, ivatk: 31, ivdef: 31, ivspatk: 31, ivspdef: 31, ivspd: 31
    });
    // Act
    component.savePokemon();
    // Assert
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/teamBuilder/1/1');
  });

  it('should call obtainPokemonDataId on pokemonId change', () => {
    spyOn(component as any, 'obtainPokemonDataId');
    // Simulate the select change event
    component.onChangeEvent({} as any);
    expect((component as any).obtainPokemonDataId).toHaveBeenCalled();
  });

  it('should call obtainPokemonTypes when obtainPokemonDataId is called', () => {
    pokemonDataServiceSpy.getPokemonDataId.and.returnValue(of([{
      id: 25,
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
    }]));
    typesServiceSpy.getPokemonDataTypes.and.returnValue(of([{ id: 13, name_en: 'Electric', image: '', image_small: '', name_es: '' }]));
    component.frm.get('pokemonId')?.setValue(25);
    (component as any).obtainPokemonDataId();
    expect(typesServiceSpy.getPokemonDataTypes).toHaveBeenCalledWith(25);
  });
});
