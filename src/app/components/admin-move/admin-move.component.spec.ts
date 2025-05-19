import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMoveComponent } from './admin-move.component';

describe('AdminMoveComponent', () => {
  let component: AdminMoveComponent;
  let fixture: ComponentFixture<AdminMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
