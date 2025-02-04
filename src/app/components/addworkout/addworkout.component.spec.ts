import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddworkoutComponent } from './addworkout.component';
import { UserService } from '../../services/user/user.service'; // Correct import path
import { of } from 'rxjs';
import { WorkoutTypeEnum } from '../../constants/user.enum';

class MockUserService {
  addUserData = jasmine.createSpy('addUserData').and.returnValue(of(null));
}

describe('AddworkoutComponent', () => {
  let component: AddworkoutComponent;
  let fixture: ComponentFixture<AddworkoutComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddworkoutComponent, FormsModule], 
      providers: [{ provide: UserService, useClass: MockUserService }], 
    }).compileComponents();

    fixture = TestBed.createComponent(AddworkoutComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as MockUserService; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.userName).toBe('');
    expect(component.duration).toBe(0);
    expect(component.workoutType).toBe('');
    expect(component.isSuccessfull).toBeFalsy();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should validate form correctly', () => {
    component.userName = 'John';
    component.duration = 30;
    component.workoutType = WorkoutTypeEnum.Running;
    expect(component.isFormValid).toBeTrue();
  });

  it('should return validation errors', () => {
    component.formTouched.userName = true;
    component.userName = 'Jo';
    expect(component.getValidationError('userName')).toBe('Username must be at least 3 characters.');

    component.formTouched.duration = true;
    component.duration = 0;
    expect(component.getValidationError('duration')).toBe('Duration must be greater than 0.');

    component.formTouched.workoutType = true;
    component.workoutType = '';
    expect(component.getValidationError('workoutType')).toBe('Please select a workout type.');
  });

  it('should not submit invalid form', () => {
    spyOn(window, 'alert');

    component.userName = '';
    component.duration = 0;
    component.workoutType = '';

    component.handleSubmit();

    expect(window.alert).toHaveBeenCalledWith('Please fill out the form correctly.');
    expect(component.isSubmitting).toBeFalse();
  });


  it('should submit form successfully', fakeAsync(() => {
    component.userName = 'John';
    component.duration = 30;
    component.workoutType = WorkoutTypeEnum.Running;

    component.handleSubmit();
    expect(component.isSubmitting).toBeTrue();

    tick(2000);

    expect(userService.addUserData).toHaveBeenCalledWith({
      userName: 'John',
      workout: 'Running',
      duration: 30,
    });
    expect(component.isSuccessfull).toBeTrue();

    tick(1500);
    expect(component.isSuccessfull).toBeFalse();
  }));

  it('should reset form after submission', fakeAsync(() => {
    component.userName = 'John';
    component.duration = 30;
    component.workoutType = WorkoutTypeEnum.Running;

    component.handleSubmit();
    tick(2000); 

    expect(component.isSuccessfull).toBeTrue();

    tick(1500); 
    fixture.detectChanges();

    expect(component.userName).toBe('');
    expect(component.duration).toBe(0);
    expect(component.workoutType).toBe('');
    expect(component.isSubmitting).toBeFalse();
  }));
});
