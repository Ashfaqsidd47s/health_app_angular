import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)], // Use provideRouter instead of RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'health-app'`, () => {
    expect(component.title).toEqual('health-app');
  });

  it('should contain app-header component', () => {
    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(header).toBeTruthy();
  });

  it('should contain a router-outlet inside main tag', () => {
    const main = fixture.debugElement.query(By.css('main')); // Find <main>
    expect(main).toBeTruthy();

    const routerOutlet = main.query(By.directive(RouterOutlet)); 
    expect(routerOutlet).toBeTruthy();
  });
});
