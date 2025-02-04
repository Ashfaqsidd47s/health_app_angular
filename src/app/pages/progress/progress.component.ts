import { Component, inject, signal } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/user.types';
import { PieComponent } from '../../components/pie/pie.component';
import { NgIf } from '@angular/common';
import { WorkoutTypeEnum } from '../../constants/user.enum';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [ChartComponent, PieComponent, NgIf],
  templateUrl: './progress.component.html'
})
export class ProgressComponent {
  dummyUser: UserData = {id: 0, userName: "user_name", workouts:[{type: WorkoutTypeEnum.Running, minutes: 60}]}
  userService = inject(UserService);
  users: { userName: string; id: number }[] = this.userService.getAllNamesAndId() ?? [];
  selectedUser = signal<UserData>(this.userService.getUserData()[0] ?? this.dummyUser);
  totalDuration: number = 0;

  constructor() {
    this.totalDuration = 0;
    this.selectedUser().workouts.forEach(w => {
      this.totalDuration += w.minutes;
    })
  }

  selectUser(id: number) {
    const user = this.userService.getUserById(id);
    if (user) {
      this.selectedUser.set(user);
    }

    this.totalDuration = 0;
    this.selectedUser().workouts.forEach(w => {
      this.totalDuration += w.minutes;
    })
  }
}
