import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminItemComponent } from './admin-item.component';
import { ItemsService } from '../../services/items/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('AdminItemComponent', () => {
  let component: AdminItemComponent;
  let fixture: ComponentFixture<AdminItemComponent>;
  let itemsServiceSpy: jasmine.SpyObj<ItemsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;

  beforeEach(async () => {
    itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getItem', 'postItem', 'updateItem']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => key === 'id' ? null : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AdminItemComponent],
      providers: [
        { provide: ItemsService, useValue: itemsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminItemComponent);
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
    expect(component.frm.get('image')).toBeTruthy();
  });

  it('should call addItem when saving a new item', () => {
    spyOn<any>(component, 'addItem');
    component.id = undefined as any;
    component.frm = component['fb'].group({
      id: [''],
      name_en: ['Potion'],
      name_es: ['Poción'],
      description_en: ['Heals HP'],
      description_es: ['Cura PS'],
      image: ['potion.png']
    });
    component.saveItem();
    expect((component as any).addItem).toHaveBeenCalled();
  });

  it('should call ItemsService.postItem in addItem', () => {
    itemsServiceSpy.postItem.and.returnValue(of({ id: 1 }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      id: [''],
      name_en: ['Potion'],
      name_es: ['Poción'],
      description_en: ['Heals HP'],
      description_es: ['Cura PS'],
      image: ['potion.png']
    });
    (component as any).addItem(new FormData());
    expect(itemsServiceSpy.postItem).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should call ItemsService.updateItem in updateItem', () => {
    itemsServiceSpy.updateItem.and.returnValue(of({ message: 'updated' }));
    spyOn(Swal, 'fire');
    component.frm = component['fb'].group({
      id: ['1'],
      name_en: ['Potion'],
      name_es: ['Poción'],
      description_en: ['Heals HP'],
      description_es: ['Cura PS'],
      image: ['potion.png']
    });
    (component as any).updateItem(new FormData());
    expect(itemsServiceSpy.updateItem).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/adminPanel');
  });

  it('should handle error in addItem', () => {
    itemsServiceSpy.postItem.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).addItem(new FormData());
    expect(console.log).toHaveBeenCalled();
  });

  it('should handle error in updateItem', () => {
    itemsServiceSpy.updateItem.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'log');
    (component as any).updateItem(new FormData());
    expect(console.log).toHaveBeenCalled();
  });

  it('should patch form values when loading item for update', () => {
    // Simulate paramMap with id
    activatedRouteStub.paramMap = of({
      get: (key: string) => key === 'id' ? '1' : null
    });
    itemsServiceSpy.getItem.and.returnValue(of([{
      id: 1,
      name_en: 'Potion',
      name_es: 'Poción',
      description_en: 'Heals HP',
      description_es: 'Cura PS',
      image: 'potion.png'
    }]));
    component.ngOnInit();
    expect(itemsServiceSpy.getItem).toHaveBeenCalledWith(1);
    expect(component.frm.get('id')?.value).toBe(1);
    expect(component.frm.get('name_en')?.value).toBe('Potion');
    expect(component.frm.get('name_es')?.value).toBe('Poción');
    expect(component.frm.get('description_en')?.value).toBe('Heals HP');
    expect(component.frm.get('description_es')?.value).toBe('Cura PS');
  });

  it('should update form control when file is selected', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    component.frm = component['fb'].group({
      image: ['']
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
