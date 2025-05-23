import { ComponentFixture, TestBed } from '@angular/core/testing';
import { C404Component } from './c404.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('C404Component', () => {
  let component: C404Component;
  let fixture: ComponentFixture<C404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, C404Component]
    }).compileComponents();

    fixture = TestBed.createComponent(C404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Error 404');
    expect(compiled.textContent).toContain('no se pudo encontrar');
  });

  it('should have a link to home', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[routerLink="/home"]');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Ir a la página de inicio');
  });
});
