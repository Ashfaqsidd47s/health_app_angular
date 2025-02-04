import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent], 
      providers: [provideRouter([])], 
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo with correct text', () => {
    const logoElement = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(logoElement.textContent.trim()).toBe('Health App');
  });

  it('should have navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('ul li'));
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].nativeElement.textContent.trim()).toBe('Home');
    expect(navLinks[1].nativeElement.textContent.trim()).toBe('Workouts');
    expect(navLinks[2].nativeElement.textContent.trim()).toBe('Progress');
  });

  it('should have a Hire Me button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Hire Me');
  });
});
