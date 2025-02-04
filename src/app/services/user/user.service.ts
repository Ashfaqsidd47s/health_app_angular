import { Injectable } from '@angular/core';
import { UserData, WorkoutType } from '../../models/user.types';
import { BehaviorSubject } from 'rxjs';
import { defaultUsers, RowCountEnum, WorkoutTypeEnum } from '../../constants/user.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<UserData>;
  currentPage: number = 1;
  totalPages: number;
  rowCount:RowCountEnum = 5;
  workoutTypes: WorkoutTypeEnum = WorkoutTypeEnum.Running
  currentPageUsers = new BehaviorSubject<UserData[]>([]);

  currentPageUsers$ = this.currentPageUsers.asObservable();


  constructor() { 
    this.users = this.getUserData();
    this.totalPages = Math.ceil(this.users.length / this.rowCount);
    const startInd = (this.currentPage - 1) * this.rowCount;
    const endInd = Math.min(this.currentPage * this.rowCount, this.users.length);
    this.currentPageUsers.next(this.users.slice(startInd, endInd))
  }

  getUserData() :Array<UserData> {
    const lsData = localStorage.getItem("userData");
    if(!lsData){
      localStorage.setItem("userData", JSON.stringify(defaultUsers));
      return defaultUsers
    }
    return  JSON.parse(lsData) as Array<UserData>;
  }

  addUserData(newUser: {userName: string, workout: string, duration: number}) {
   
    const data = this.getUserData();
    const userIndex = data.findIndex(user => user.userName === newUser.userName)
    if(userIndex !== -1){
      const workoutIndex = data[userIndex].workouts.findIndex(workout => workout.type === newUser.workout)

      if(workoutIndex !== -1){
        data[userIndex].workouts[workoutIndex].minutes = newUser.duration;
      } else {
        data[userIndex].workouts.push({type: newUser.workout, minutes: newUser.duration})
      }
    } else {
      const newId = data.length + 1;
      data.push({
        id: newId,
        userName: newUser.userName,
        workouts: [{type: newUser.workout, minutes: newUser.duration}]
      })
    }

    localStorage.setItem("userData", JSON.stringify(data))
    this.users = data;

    this.totalPages = Math.ceil(this.users.length / this.rowCount)

    if(this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePage(this.currentPage);
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.updatePage(this.currentPage);
    }
  }
  prevPage() {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updatePage(this.currentPage);
    }
  }
  updatePage(newPage: number) {
    if( newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    } else {
      this.currentPage = 1;
    }
    const startInd = (this.currentPage - 1) * this.rowCount;
    const endInd = Math.min(this.currentPage * this.rowCount, this.users.length);
    this.currentPageUsers.next(this.users.length > 0 ? this.users.slice(startInd, endInd) : []);
  }
  updateRowCount(newRowCount: Number) {
    newRowCount = Number(newRowCount);
    if(Object.values(RowCountEnum).includes(newRowCount as RowCountEnum)) {
      this.rowCount = newRowCount as 5 | 10 | 20 | 50 | 100;

      this.totalPages = Math.ceil(this.users.length / this.rowCount);

      if(this.currentPage > this.totalPages){
        this.currentPage = this.totalPages
      }
      this.updatePage(this.currentPage);
    } 
  }
  getCurrentPageData(){
    return this.currentPageUsers;
  }

  searchByUserName(name: string) {
    name = name.trim().toLowerCase();
    if(name === ""){
      this.users = this.getUserData();
    } else {
      this.users = this.getUserData().filter((user)=> user.userName.toLowerCase().includes(name))
    }

    this.totalPages = Math.ceil(this.users.length / this.rowCount)

    if(this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePage(this.currentPage);
  }

  filterByWorkoutType( type: string) {
    if(Object.values(WorkoutTypeEnum).includes(type as WorkoutTypeEnum)) {
      this.users = this.getUserData().filter((user) => user.workouts.some(workout => workout.type === type))
    } else {
      this.users = this.getUserData();
    }
    
    this.totalPages = Math.ceil(this.users.length / this.rowCount)

    if(this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePage(this.currentPage);
  }

  getAllNames() : string[] {
    return this.users.map((user) => user.userName)
  }
  getAllNamesAndId() : {userName:string, id: number}[] {
    
    return this.users.map((user) => {
      return{
        userName: user.userName,
        id: user.id
    }})
  }
  getUserById(id: number): UserData | null {
    const user = this.users.find((user) => user.id === id)
    if(user) return user;
    return null;
  }
}

