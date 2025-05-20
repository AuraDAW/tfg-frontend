import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbilitiesMovesPokemonComponent } from './add-abilities-moves-pokemon.component';

describe('AddAbilitiesMovesPokemonComponent', () => {
  let component: AddAbilitiesMovesPokemonComponent;
  let fixture: ComponentFixture<AddAbilitiesMovesPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAbilitiesMovesPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAbilitiesMovesPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
