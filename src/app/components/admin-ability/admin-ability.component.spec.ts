import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAbilityComponent } from './admin-ability.component';
import { AbilitiesService } from '../../services/abilities/abilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('AdminAbilityComponent', () => {
  let component: AdminAbilityComponent;
  let fixture: ComponentFixture<AdminAbilityComponent>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getAbility', 'postAbility', 'updateAbility']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => key === 'id' ? null : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminAbilityComponent],
      providers: [
        { provide: AbilitiesService, useValue: abilitiesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAbilityComponent);
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
    expect(component.frm.get('description_en')).toBeTruthy();
    expect(component.frm.get('description_es')).toBeTruthy();
  });

  it('should call addAbility when saving a new ability', () => {
    spyOn<any>(component, 'addAbility');
    component.id = undefined as any;
    component.frm = component['fb'].group({
      name_en: ['Ability EN'],
      name_es: ['Ability ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES']
    });
    component.saveAbility();
    expect((component as any).addAbility).toHaveBeenCalled();
  });

  it('should call updateAbility when saving an existing ability', () => {
    spyOn<any>(component, 'updateAbility');
    component.id = 1;
    component.frm = component['fb'].group({
      name_en: ['Ability EN'],
      name_es: ['Ability ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES']
    });
    component.saveAbility();
    expect((component as any).updateAbility).toHaveBeenCalled();
  });

  it('should call AbilitiesService.postAbility in addAbility', () => {
    abilitiesServiceSpy.postAbility.and.returnValue(of({ id: 1 }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      name_en: ['Ability EN'],
      name_es: ['Ability ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES']
    });
    (component as any).addAbility({
      id: undefined,
      name_en: 'Ability EN',
      name_es: 'Ability ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES'
    });
    expect(abilitiesServiceSpy.postAbility).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should call AbilitiesService.updateAbility in updateAbility', () => {
    abilitiesServiceSpy.updateAbility.and.returnValue(of({ message: 'updated' }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      name_en: ['Ability EN'],
      name_es: ['Ability ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES']
    });
    (component as any).updateAbility({
      id: 1,
      name_en: 'Ability EN',
      name_es: 'Ability ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES'
    });
    expect(abilitiesServiceSpy.updateAbility).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should load ability info for editing if id is present', () => {
    // Simulate paramMap with id
    activatedRouteStub.paramMap = of({
      get: (key: string) => key === 'id' ? '1' : null
    });
    abilitiesServiceSpy.getAbility.and.returnValue(of([{
      id: 1,
      name_en: 'Ability EN',
      name_es: 'Ability ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES'
    }]));
    component.ngOnInit();
    expect(abilitiesServiceSpy.getAbility).toHaveBeenCalledWith(1);
  });

  it('should handle error in addAbility', () => {
    abilitiesServiceSpy.postAbility.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).addAbility({
      id: undefined,
      name_en: 'Ability EN',
      name_es: 'Ability ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES'
    });
    expect(console.log).toHaveBeenCalled();
  });

  it('should handle error in updateAbility', () => {
    abilitiesServiceSpy.updateAbility.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).updateAbility({
      id: 1,
      name_en: 'Ability EN',
      name_es: 'Ability ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES'
    });
    expect(console.log).toHaveBeenCalled();
  });
});
