import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this import

// Mock standalone components for app-menu and app-footer
@Component({selector: 'app-menu', template: '', standalone: true})
class MockMenuComponent {}

@Component({selector: 'app-footer', template: '', standalone: true})
class MockFooterComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule, // <-- Add this line
        TranslateModule.forRoot(),
        MockMenuComponent,
        MockFooterComponent,
        AppComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu')).not.toBeNull();
  });

  it('should render app-footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});