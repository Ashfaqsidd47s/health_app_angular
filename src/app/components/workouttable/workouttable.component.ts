import { Component, inject } from '@angular/core';
import { UserData, UserRowData } from '../../models/user.types';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { WorkoutTypeEnum } from '../../constants/user.enum';

@Component({
  selector: 'app-workouttable',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, PaginationComponent],
  templateUrl: './workouttable.component.html'
})
export class WorkouttableComponent {
  userData: Array<UserData> = []; 
  tableFormatedData: Array<UserRowData> = []; 
  userService = inject(UserService)
  subscription: Subscription | undefined;
  searchName: string = ""
  filterType: WorkoutTypeEnum | "All" = "All"
  allFilterWorkouts : (WorkoutTypeEnum | "All") [] = [...(Object.values(WorkoutTypeEnum)), "All"];
 
  constructor() {}

  ngOnInit(): void {
      this.subscription = this.userService.currentPageUsers$.subscribe( users => {
        this.userData = users;
        console.log("changes in this component :", users)
        this.formatTableData(users)
      })
  }
  formatTableData( newData: UserData[]) {
    this.tableFormatedData = newData.map(data => {
      let tempWorkout = data.workouts.map(workout => workout.type).join(', ');
      let totalTime = data.workouts.reduce((sum, workout) => sum + workout.minutes, 0);
      
      return {
        id: data.id,
        userName: data.userName,
        count: data.workouts.length,
        workouts: tempWorkout,
        totalTime: totalTime,
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); 
  }

  searchByName() {
    console.log("searching", this.searchName)
    this.userService.searchByUserName(this.searchName);
  }
  filterByType() {
    console.log("searching", this.filterType)
    this.userService.filterByWorkoutType(this.filterType);
  }
}