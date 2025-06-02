import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPokemonComponent } from './admin-pokemon.component';
import { PokemonDataService } from '../../services/pokemon-data/pokemon-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AdminPokemonComponent', () => {
  let component: AdminPokemonComponent;
  let fixture: ComponentFixture<AdminPokemonComponent>;
  let pokemonDataServiceSpy: jasmine.SpyObj<PokemonDataService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    pokemonDataServiceSpy = jasmine.createSpyObj('PokemonDataService', ['getPokemonDataId', 'postPokemonData', 'updatePokemonData']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => key === 'id' ? null : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AdminPokemonComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: PokemonDataService, useValue: pokemonDataServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.frm).toBeDefined();
    expect(component.frm.get('name_en')).toBeTruthy();
    expect(component.frm.get('name_es')).toBeTruthy();
    expect(component.frm.get('pokedex_id')).toBeTruthy();
    expect(component.frm.get('type_1')).toBeTruthy();
    expect(component.frm.get('type_2')).toBeTruthy();
    expect(component.frm.get('base_hp')).toBeTruthy();
    expect(component.frm.get('base_atk')).toBeTruthy();
    expect(component.frm.get('base_def')).toBeTruthy();
    expect(component.frm.get('base_spatk')).toBeTruthy();
    expect(component.frm.get('base_spdef')).toBeTruthy();
    expect(component.frm.get('base_spd')).toBeTruthy();
    expect(component.frm.get('image')).toBeTruthy();
    expect(component.frm.get('imageShiny')).toBeTruthy();

  });

  it('should call addPokemon when saving a new pokemon', () => {
    spyOn<any>(component, 'addPokemon');
    component.id = undefined as any;
    component.frm = component['fb'].group({
      id: [''],
      name: ['Pikachu'],
      pokedex_id: [25],
      type_1: [13],
      type_2: [0],
      base_hp: [35],
      base_atk: [55],
      base_def: [40],
      base_spatk: [50],
      base_spdef: [50],
      base_spd: [90],
      image: ['pikachu.png'],
      imageShiny: ['pikachu_shiny.png']
    });
    component.savePokemon();
    expect((component as any).addPokemon).toHaveBeenCalled();
  });

  it('should call PokemonDataService.postPokemonData in addPokemon', () => {
    pokemonDataServiceSpy.postPokemonData.and.returnValue(of({ id: 1 }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      id: [''],
      name: ['Pikachu'],
      pokedex_id: [25],
      type_1: [13],
      type_2: [0],
      base_hp: [35],
      base_atk: [55],
      base_def: [40],
      base_spatk: [50],
      base_spdef: [50],
      base_spd: [90],
      image: ['pikachu.png'],
      imageShiny: ['pikachu_shiny.png']
    });
    (component as any).addPokemon(new FormData());
    expect(pokemonDataServiceSpy.postPokemonData).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should call PokemonDataService.updatePokemonData in updatePokemon', () => {
    pokemonDataServiceSpy.updatePokemonData.and.returnValue(of({ message: 'updated' }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      id: ['1'],
      name: ['Pikachu'],
      pokedex_id: [25],
      type_1: [13],
      type_2: [0],
      base_hp: [35],
      base_atk: [55],
      base_def: [40],
      base_spatk: [50],
      base_spdef: [50],
      base_spd: [90],
      image: ['pikachu.png'],
      imageShiny: ['pikachu_shiny.png']
    });
    (component as any).updatePokemon(new FormData());
    expect(pokemonDataServiceSpy.updatePokemonData).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should handle error in addPokemon', () => {
    pokemonDataServiceSpy.postPokemonData.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).addPokemon(new FormData());
    expect(console.log).toHaveBeenCalled();
  });

  it('should handle error in updatePokemon', () => {
    pokemonDataServiceSpy.updatePokemonData.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).updatePokemon(new FormData());
    expect(console.log).toHaveBeenCalled();
  });

  it('should patch form values when loading pokemon for update', () => {
    // Simulate paramMap with id
    activatedRouteStub.paramMap = of({
      get: (key: string) => key === 'id' ? '1' : null
    });
    pokemonDataServiceSpy.getPokemonDataId.and.returnValue(of([{
      id: 1,
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
      name_es: 'Pikachu'
    }]));
    component.ngOnInit();
    expect(pokemonDataServiceSpy.getPokemonDataId).toHaveBeenCalledWith(1);
    expect(component.frm.get('id')?.value).toBe(1);
    expect(component.frm.get('name_en')?.value).toBe('Pikachu');
    expect(component.frm.get('name_es')?.value).toBe('Pikachu');
    expect(component.frm.get('pokedex_id')?.value).toBe(25);
    expect(component.frm.get('type_1')?.value).toBe(13);
    expect(component.frm.get('type_2')?.value).toBe(0);
    expect(component.frm.get('base_hp')?.value).toBe(35);
    expect(component.frm.get('base_atk')?.value).toBe(55);
    expect(component.frm.get('base_def')?.value).toBe(40);
    expect(component.frm.get('base_spatk')?.value).toBe(50);
    expect(component.frm.get('base_spdef')?.value).toBe(50);
    expect(component.frm.get('base_spd')?.value).toBe(90);
  });

  it('should update form control when file is selected', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    component.frm = component['fb'].group({
      image: [''],
      imageShiny: ['']
    });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;
    component.onFileChange(event, 'image');
    expect(component.frm.get('image')?.value).toBe(file);
  });
});
