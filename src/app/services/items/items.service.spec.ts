import { TestBed } from '@angular/core/testing';
import { ItemsService } from './items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Item } from '../../models/item';
import { environment } from '../../../environments/environment';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockItem: Item = {
    id: 1,
    name_en: 'Potion',
    description_en: 'Heals 20 HP',
    image: 'potion.png',
    name_es: 'Poción',
    description_es: 'Cura 20 PS',
    entityType: 'item'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService]
    });
    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all items', () => {
    const mockItems: Item[] = [mockItem];
    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });
    const req = httpMock.expectOne(`${apiUrl}/items`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should fetch an item by id', () => {
    const mockItems: Item[] = [mockItem];
    service.getItem(1).subscribe(items => {
      expect(items).toEqual(mockItems);
    });
    const req = httpMock.expectOne(`${apiUrl}/items/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should post a new item', () => {
    const formData = new FormData();
    formData.append('id', '2');
    formData.append('name_en', 'Super Potion');
    formData.append('description_en', 'Heals 50 HP');
    formData.append('image', 'super_potion.png');
    formData.append('name_es', 'Super Poción');
    formData.append('description_es', 'Cura 50 PS');
    formData.append('entityType', 'item');

    const mockResponse = { id: 2 };
    service.postItem(formData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/items`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(mockResponse);
  });

  it('should update an item', () => {
    const formData = new FormData();
    formData.append('id', '1');
    formData.append('name_en', 'Potion Updated');
    formData.append('description_en', 'Heals 25 HP');
    formData.append('image', 'potion_updated.png');
    formData.append('name_es', 'Poción Actualizada');
    formData.append('description_es', 'Cura 25 PS');
    formData.append('entityType', 'item');

    const mockResponse = { message: 'updated' };
    service.updateItem(formData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${apiUrl}/items/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(formData);
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    service.getItems().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(
          error.message.toLowerCase()
        ).toMatch(/error del servidor|error del cliente/i);
      }
    });
    const req = httpMock.expectOne(`${apiUrl}/items`);
    req.error(new ErrorEvent('Network error'));
  });
});
