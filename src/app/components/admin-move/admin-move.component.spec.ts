import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMoveComponent } from './admin-move.component';
import { MovesService } from '../../services/moves/moves.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminMoveComponent', () => {
  let component: AdminMoveComponent;
  let fixture: ComponentFixture<AdminMoveComponent>;
  let movesServiceSpy: jasmine.SpyObj<MovesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    movesServiceSpy = jasmine.createSpyObj('MovesService', ['getMove', 'postMove', 'updateMove']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => key === 'id' ? null : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AdminMoveComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MovesService, useValue: movesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMoveComponent);
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
    expect(component.frm.get('type')).toBeTruthy();
    expect(component.frm.get('power')).toBeTruthy();
    expect(component.frm.get('accuracy')).toBeTruthy();
  });

  it('should call addMove when saving a new move', () => {
    spyOn<any>(component, 'addMove');
    component.id = undefined as any;
    component.frm = component['fb'].group({
      name_en: ['Move EN'],
      name_es: ['Move ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES'],
      type: [1],
      power: [50],
      accuracy: [100]
    });
    component.saveMove();
    expect((component as any).addMove).toHaveBeenCalled();
  });

  it('should call updateMove when saving an existing move', () => {
    spyOn<any>(component, 'updateMove');
    component.id = 1;
    component.frm = component['fb'].group({
      name_en: ['Move EN'],
      name_es: ['Move ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES'],
      type: [1],
      power: [50],
      accuracy: [100]
    });
    component.saveMove();
    expect((component as any).updateMove).toHaveBeenCalled();
  });

  it('should call MovesService.postMove in addMove', () => {
    movesServiceSpy.postMove.and.returnValue(of({ id: 1 }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      name_en: ['Move EN'],
      name_es: ['Move ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES'],
      type: [1],
      power: [50],
      accuracy: [100]
    });
    (component as any).addMove({
      id: undefined,
      name_en: 'Move EN',
      name_es: 'Move ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES',
      type: 1,
      power: 50,
      accuracy: 100
    });
    expect(movesServiceSpy.postMove).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should call MovesService.updateMove in updateMove', () => {
    movesServiceSpy.updateMove.and.returnValue(of({ message: 'updated' }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      name_en: ['Move EN'],
      name_es: ['Move ES'],
      description_en: ['Desc EN'],
      description_es: ['Desc ES'],
      type: [1],
      power: [50],
      accuracy: [100]
    });
    (component as any).updateMove({
      id: 1,
      name_en: 'Move EN',
      name_es: 'Move ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES',
      type: 1,
      power: 50,
      accuracy: 100
    });
    expect(movesServiceSpy.updateMove).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should load move info for editing if id is present', () => {
    // Simulate paramMap with id
    activatedRouteStub.paramMap = of({
      get: (key: string) => key === 'id' ? '1' : null
    });
    movesServiceSpy.getMove.and.returnValue(of([{
      id: 1,
      name_en: 'Move EN',
      name_es: 'Move ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES',
      type: 1,
      power: 50,
      accuracy: 100
    }]));
    component.ngOnInit();
    expect(movesServiceSpy.getMove).toHaveBeenCalledWith(1);
  });

  it('should handle error in addMove', () => {
    movesServiceSpy.postMove.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).addMove({
      id: undefined,
      name_en: 'Move EN',
      name_es: 'Move ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES',
      type: 1,
      power: 50,
      accuracy: 100
    });
    expect(console.log).toHaveBeenCalled();
  });

  it('should handle error in updateMove', () => {
    movesServiceSpy.updateMove.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).updateMove({
      id: 1,
      name_en: 'Move EN',
      name_es: 'Move ES',
      description_en: 'Desc EN',
      description_es: 'Desc ES',
      type: 1,
      power: 50,
      accuracy: 100
    });
    expect(console.log).toHaveBeenCalled();
  });
});
