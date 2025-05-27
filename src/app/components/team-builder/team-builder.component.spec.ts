import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamBuilderComponent } from './team-builder.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from '../../services/teams/teams.service';
import { PokemonTeamService } from '../../services/pokemon-team/pokemon-team.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { ItemsService } from '../../services/items/items.service';
import { MovesService } from '../../services/moves/moves.service';
import { TypesService } from '../../services/types/types.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { DialogExportComponent } from '../dialog-export/dialog-export.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

describe('TeamBuilderComponent', () => {
  let component: TeamBuilderComponent;
  let fixture: ComponentFixture<TeamBuilderComponent>;
  let teamsServiceSpy: jasmine.SpyObj<TeamsService>;
  let pokemonTeamServiceSpy: jasmine.SpyObj<PokemonTeamService>;
  let pokemonDataServiceSpy: jasmine.SpyObj<PokemonDataService>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;
  let itemsServiceSpy: jasmine.SpyObj<ItemsService>;
  let movesServiceSpy: jasmine.SpyObj<MovesService>;
  let typesServiceSpy: jasmine.SpyObj<TypesService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    teamsServiceSpy = jasmine.createSpyObj('TeamsService', ['getTeam', 'updatePokemonTeam']);
    pokemonTeamServiceSpy = jasmine.createSpyObj('PokemonTeamService', ['getPokemonTeamId']);
    pokemonDataServiceSpy = jasmine.createSpyObj('PokemonDataService', ['getPokemonDataFromTeam']);
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getAbility']);
    itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getItem']);
    movesServiceSpy = jasmine.createSpyObj('MovesService', ['getMove']);
    typesServiceSpy = jasmine.createSpyObj('TypesService', ['getType']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => {
          if (key === 'userId') return '1';
          if (key === 'teamId') return '10';
          return null;
        }
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        TeamBuilderComponent,
        CommonModule,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: TeamsService, useValue: teamsServiceSpy },
        { provide: PokemonTeamService, useValue: pokemonTeamServiceSpy },
        { provide: PokemonDataService, useValue: pokemonDataServiceSpy },
        { provide: AbilitiesService, useValue: abilitiesServiceSpy },
        { provide: ItemsService, useValue: itemsServiceSpy },
        { provide: MovesService, useValue: movesServiceSpy },
        { provide: TypesService, useValue: typesServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamBuilderComponent);
    component = fixture.componentInstance;

    // Default spies for ngOnInit and data loading
    teamsServiceSpy.getTeam.and.returnValue(of([
      {
        id: 10,
        name: 'Test Team',
        description: 'A test team',
        user_id: 1,
        pokemon_1: 101,
        pokemon_2: undefined,
        pokemon_3: undefined,
        pokemon_4: undefined,
        pokemon_5: undefined,
        pokemon_6: undefined
      }
    ]));
    pokemonTeamServiceSpy.getPokemonTeamId.and.returnValue(of([
      {
        id: 201,
        id_pokemon: 101,
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
        ev_spatk: 252,
        ev_def: 0,
        ev_spdef: 4,
        ev_spd: 0,
        ev_hp: 252,
        is_shiny: false,
        tera_type: 1,
        level: 50
      }
    ]));
    pokemonDataServiceSpy.getPokemonDataFromTeam.and.returnValue(of([
      {
        id: 101,
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
      }
    ]));
    typesServiceSpy.getType.and.returnValue(of({
      id: 1,
      name_en: 'Electric',
      image: 'electric.png',
      image_small: 'electric_small.png',
      name_es: 'Eléctrico'
    }));
    abilitiesServiceSpy.getAbility.and.returnValue(of([{ name_en: 'Static' }]));
    itemsServiceSpy.getItem.and.returnValue(of([{ name_en: 'Light Ball' }]));
    movesServiceSpy.getMove.and.returnValue(of([{ name_en: 'Thunderbolt' }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load team and pokemon data on init', () => {
    expect(component.aTeams.length).toBeGreaterThan(0);
    expect(component.aTeams[0].name).toBe('Test Team');
    expect(component.aFullPokemonTeam.length).toBeGreaterThan(0);
    expect(component.aFullPokemonTeam[0].baseData.name_en).toBe('Pikachu');
  });

  it('should navigate to addPokemon', () => {
    component['teamId'] = 10;
    component.addPokemon();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pokemonFrm/10');
  });

  it('should open edit dialog and update team on editTeam', () => {
    component.aTeams = [{
      id: 10,
      name: 'Test Team',
      description: 'A test team',
      user_id: 1,
      pokemon_1: 101,
      pokemon_2: undefined,
      pokemon_3: undefined,
      pokemon_4: undefined,
      pokemon_5: undefined,
      pokemon_6: undefined
    }];
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ name: 'Updated Team', description: 'Updated Desc' }), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    teamsServiceSpy.updatePokemonTeam.and.returnValue(of({ message: 'updated' }));
    component.editTeam();
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogFormComponent, {
      data: { name: 'Test Team', description: 'A test team' }
    });
    expect(teamsServiceSpy.updatePokemonTeam).toHaveBeenCalled();
  });

  it('should open export dialog on exportTeam', async () => {
    spyOn(component as any, 'generateShowdownTeam').and.returnValue(Promise.resolve());
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);
    component.aFullPokemonTeam = [{} as any];
    await component.exportTeam();
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogExportComponent, { data: component.aExport });
    expect(component.aExport).toEqual([]);
  });

  it('should render team name and description', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Team');
    expect(compiled.textContent).toContain('A test team');
  });

  it('should render export button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('teamBuilder.export');
  });

  it('should render empty team message if no pokemon', () => {
    component.aFullPokemonTeam = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('teamBuilder.emptyTeam');
  });
});
