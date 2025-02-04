import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserData, WorkoutType } from '../../models/user.types';
import { WorkoutTypeEnum } from '../../constants/user.enum';

describe('UserService', () => {
  let service: UserService;

  const mockUserData: UserData[] = [
    {
      id: 1,
      userName: 'Ashfaq',
      workouts: [
        { type: WorkoutTypeEnum.Running, minutes: 30 },
        { type: WorkoutTypeEnum.Cycling, minutes: 20 },
      ],
    },
    {
      id: 2,
      userName: 'Vivek',
      workouts: [
        { type: WorkoutTypeEnum.Yoga, minutes: 40 },
        { type: WorkoutTypeEnum.Running, minutes: 15 },
      ],
    },
    {
      id: 3,
      userName: 'Sachin',
      workouts: [
        { type: WorkoutTypeEnum.Cycling, minutes: 40 },
        { type: WorkoutTypeEnum.Jogging, minutes: 20 },
      ],
    },
    {
      id: 4,
      userName: 'Santosh',
      workouts: [
        { type: WorkoutTypeEnum.Cycling, minutes: 20 },
      ],
    },
    {
      id: 5,
      userName: 'Mukul',
      workouts: [
        { type: WorkoutTypeEnum.Swimming, minutes: 60 },
      ],
    },
    {
      id: 6,
      userName: 'Sandeep',
      workouts: [
        { type: WorkoutTypeEnum.Jogging, minutes: 30 },
      ],
    },
  ];

  beforeEach(() => {
    let storage: { [key: string]: string } = { "userData": JSON.stringify(mockUserData) };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      storage[key] = value;
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user data from localStorage and update current page users', () => {
    service.updatePage(1);
    expect(service.getUserData().length).toBe(6);
  });

  it('should add new user data', () => {
    const newUser = { userName: 'John', workout: WorkoutTypeEnum.Jogging, duration: 30 };
    service.addUserData(newUser);

    const users = service.getUserData();
    expect(users.length).toBe(7); 
    expect(users[6].userName).toBe('John');
    expect(users[6].workouts.length).toBe(1);
    expect(users[6].workouts[0].type).toBe(WorkoutTypeEnum.Jogging);
    expect(users[6].workouts[0].minutes).toBe(30);
  });

  it('should update user workout minutes if the workout already exists', () => {
    const newUser = { userName: 'Ashfaq', workout: WorkoutTypeEnum.Running, duration: 60 };
    service.addUserData(newUser);

    const users = service.getCurrentPageData().getValue();
    const updatedUser = users.find(u => u.userName === 'Ashfaq');
    const workout = updatedUser?.workouts.find(w => w.type === WorkoutTypeEnum.Running);

    expect(workout?.minutes).toBe(60); 
  });

  it('should update the current page data after filtering by workout type', () => {
    service.filterByWorkoutType(WorkoutTypeEnum.Running);
    const users = service.getCurrentPageData().getValue();
    expect(users.length).toBe(2); 
  });

  it('should update the current page data after searching by username', () => {
    service.searchByUserName('Vivek');
    const users = service.getCurrentPageData().getValue();
    expect(users.length).toBe(1); 
    expect(users[0].userName).toBe('Vivek');
  });

  it('should update total pages after adding a user', () => {
    const newUser = { userName: 'Mike', workout: WorkoutTypeEnum.Yoga, duration: 30 };
    service.addUserData(newUser);
    expect(service.totalPages).toBe(2); 
  });

  it('should handle pagination correctly when changing pages', () => {
    service.updatePage(2);
    expect(service.currentPage).toBe(2); 
  });

  it('should handle pagination correctly when changing row count', () => {
    service.updateRowCount(10);
    expect(service.rowCount).toBe(10); 
    expect(service.totalPages).toBe(1); 
    expect(service.getCurrentPageData().getValue().length).toBe(6)
  });

  it('should return all usernames', () => {
    const userNames = service.getAllNames();
    expect(userNames).toEqual(["Ashfaq", "Vivek", "Sachin", "Santosh", "Mukul", "Sandeep"]); 
  });

  it('should return all usernames with id', () => {
    const userNamesAndId = service.getAllNamesAndId();
    expect(userNamesAndId).toEqual([
      {userName: "Ashfaq",id: 1},
      {userName: "Vivek",id: 2},
      {userName: "Sachin",id: 3},
      {userName: "Santosh",id: 4},
      {userName: "Mukul",id: 5},
      {userName: "Sandeep",id: 6},
    ]); 
  });

  it('should return user by ID', () => {
    const user = service.getUserById(3);
    expect(user).toBeDefined();
    expect(user?.userName).toBe('Sachin');
  });

  // New test 
  it('should return null if user by ID does not exist', () => {
    const user = service.getUserById(999);
    expect(user).toBeNull();
  });

  it('should reset to first page if totalPages becomes zero', () => {
    service.searchByUserName('non-existent-user');
    expect(service.currentPage).toBe(1);
  });

  it('should not go to next page if already on last page', () => {
    service.currentPage = service.totalPages;
    service.nextPage();
    expect(service.currentPage).toBe(service.totalPages);
  });

  it('should not go to previous page if already on first page', () => {
    service.currentPage = 1;
    service.prevPage();
    expect(service.currentPage).toBe(1);
  });

  it('should update total pages after adding a user', () => {
    const newUser = { userName: 'Mike', workout: WorkoutTypeEnum.Yoga, duration: 30 };
    service.addUserData(newUser);
    expect(service.totalPages).toBe(2); 
  });

  it('should not add duplicate users', () => {
    const newUser = { userName: 'Sachin', workout: WorkoutTypeEnum.Cycling, duration: 50 };
    service.addUserData(newUser);

    const users = service.getUserData().filter(u => u.userName === 'Sachin');
    expect(users.length).toBe(1);
  });

});
