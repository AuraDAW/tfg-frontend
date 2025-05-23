import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHelpComponent } from './dialog-help.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DialogHelpComponent', () => {
  let component: DialogHelpComponent;
  let fixture: ComponentFixture<DialogHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHelpComponent, TranslateModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
