import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminpanelComponent } from './adminpanel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items/items.service';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { MovesService } from '../../services/moves/moves.service';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { UsersService } from '../../services/users/users.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AdminpanelComponent', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let itemsServiceSpy: jasmine.SpyObj<ItemsService>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;
  let movesServiceSpy: jasmine.SpyObj<MovesService>;
  let pokemonDataServiceSpy: jasmine.SpyObj<PokemonDataService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getItems']);
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getAbilities']);
    movesServiceSpy = jasmine.createSpyObj('MovesService', ['getMoves']);
    pokemonDataServiceSpy = jasmine.createSpyObj('PokemonDataService', ['getPokemonData']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);

    itemsServiceSpy.getItems.and.returnValue(of([]));
    abilitiesServiceSpy.getAbilities.and.returnValue(of([]));
    movesServiceSpy.getMoves.and.returnValue(of([]));
    pokemonDataServiceSpy.getPokemonData.and.returnValue(of([]));
    usersServiceSpy.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        AdminpanelComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ItemsService, useValue: itemsServiceSpy },
        { provide: AbilitiesService, useValue: abilitiesServiceSpy },
        { provide: MovesService, useValue: movesServiceSpy },
        { provide: PokemonDataService, useValue: pokemonDataServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.frm).toBeDefined();
    expect(itemsServiceSpy.getItems).toHaveBeenCalled();
    expect(abilitiesServiceSpy.getAbilities).toHaveBeenCalled();
    expect(movesServiceSpy.getMoves).toHaveBeenCalled();
    expect(pokemonDataServiceSpy.getPokemonData).toHaveBeenCalled();
    expect(usersServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('should update selectedOption and aCurrentArray on change event', () => {
    component.aPokemonData = [{ entityType: 'pokemonData', name_en: 'Pikachu' }] as any;
    component.frm.get('selectElement')?.setValue('1');
    component.onChangeEvent({} as any);
    expect(component.selectedOption).toBe(1);
    expect(component.aCurrentArray).toEqual(component.aPokemonData);
  });

  it('should call router.navigateByUrl with correct url on createElement', () => {
    component.selectedOption = 1;
    component.createElement();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPokemon');

    component.selectedOption = 2;
    component.createElement();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminMoves');

    component.selectedOption = 3;
    component.createElement();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminItems');

    component.selectedOption = 4;
    component.createElement();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminAbilities');

    component.selectedOption = 5;
    component.createElement();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/register');
  });

  it('should call router.navigateByUrl with correct url on editElement', () => {
    const pokemon = { id: 1, entityType: 'pokemonData' };
    const move = { id: 2, entityType: 'move' };
    const item = { id: 3, entityType: 'item' };
    const ability = { id: 4, entityType: 'ability' };

    component.editElement(pokemon);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPokemon/1');

    component.editElement(move);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminMoves/2');

    component.editElement(item);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('adminItems/3');

    component.editElement(ability);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('adminAbilities/4');
  });

  it('should return correct type for isPokemonData, isMove, isItem, isAbility', () => {
    expect(component.isPokemonData({ entityType: 'pokemonData' })).toBeTrue();
    expect(component.isMove({ entityType: 'move' })).toBeTrue();
    expect(component.isItem({ entityType: 'item' })).toBeTrue();
    expect(component.isAbility({ entityType: 'ability' })).toBeTrue();
  });
});
