import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbilityComponent } from './admin-ability.component';

describe('AdminAbilityComponent', () => {
  let component: AdminAbilityComponent;
  let fixture: ComponentFixture<AdminAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAbilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
