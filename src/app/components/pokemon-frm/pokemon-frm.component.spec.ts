import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFrmComponent } from './pokemon-frm.component';

describe('PokemonFrmComponent', () => {
  let component: PokemonFrmComponent;
  let fixture: ComponentFixture<PokemonFrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonFrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
