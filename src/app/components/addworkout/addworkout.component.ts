import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { WorkoutTypeEnum } from '../../constants/user.enum';

@Component({
  selector: 'app-addworkout',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './addworkout.component.html'
})

export class AddworkoutComponent {
  userService = inject(UserService)
  userName: string = '';
  duration: number = 0;
  workoutType: WorkoutTypeEnum | "" = "";
  isSuccessfull: boolean = false;
  isSubmitting: boolean = false;

  formTouched = {
    userName: false,
    duration: false,
    workoutType: false,
  };

  allWorkouts: WorkoutTypeEnum[] = Object.values(WorkoutTypeEnum);

  constructor() {}

  get isFormValid(): boolean {
    return this.userName.length >= 3 && this.duration > 0 && this.workoutType !== '';
  }

  getValidationError(field: keyof typeof this.formTouched): string | null {
    if (!this.formTouched[field] && !this.isSubmitting) return null;

    switch (field) {
      case 'userName':
        return this.userName.length < 3 ? 'Username must be at least 3 characters.' : null;
      case 'duration':
        return this.duration <= 0 ? 'Duration must be greater than 0.' : null;
      case 'workoutType':
        return this.workoutType === '' ? 'Please select a workout type.' : null;
      default:
        return null;
    }
  }

  handleSubmit(): void {
    this.isSubmitting = true;

    if (!this.isFormValid) {
      this.isSubmitting = false;
      alert('Please fill out the form correctly.');
      return;
    }

    setTimeout(() => {
      this.userService.addUserData({
        userName: this.userName,
        workout: this.workoutType,
        duration: this.duration,
      });

      this.isSuccessfull = true;
      this.resetForm();
      setTimeout(() => (this.isSuccessfull = false), 1500);

    }, 2000);
  }

  private resetForm(): void {
    this.userName = '';
    this.duration = 0;
    this.workoutType = '';
    this.isSubmitting = false;
    this.formTouched = { userName: false, duration: false, workoutType: false };
  }
}
