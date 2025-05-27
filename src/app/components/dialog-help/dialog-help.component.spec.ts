import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogHelpComponent } from './dialog-help.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DialogHelpComponent', () => {
  let component: DialogHelpComponent;
  let fixture: ComponentFixture<DialogHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHelpComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a cancel button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[mat-dialog-close]');
    expect(button).toBeTruthy();
    expect(button?.textContent?.toLowerCase()).toContain('cancel');
  });
});
