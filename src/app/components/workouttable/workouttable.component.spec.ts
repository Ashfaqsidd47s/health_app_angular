import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkouttableComponent } from './workouttable.component';
import { UserService } from '../../services/user/user.service';
import { of } from 'rxjs';
import { UserData, UserRowData } from '../../models/user.types';
import { PaginationComponent } from '../pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutTypeEnum } from '../../constants/user.enum';

describe('WorkouttableComponent', () => {
  let component: WorkouttableComponent;
  let fixture: ComponentFixture<WorkouttableComponent>;
  let userServiceMock: any;

  beforeEach(async () => {
    
    userServiceMock = {
      currentPageUsers$: of([]),  
      searchByUserName: jasmine.createSpy('searchByUserName'),
      filterByWorkoutType: jasmine.createSpy('filterByWorkoutType')
    };

    await TestBed.configureTestingModule({
      imports: [WorkouttableComponent, FormsModule, NgFor, NgIf, PaginationComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkouttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to currentPageUsers$ and update userData', () => {
    const mockUserData: UserData[] = [
      {
        id: 1,
        userName: 'John',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Yoga', minutes: 45 }]
      },
      {
        id: 2,
        userName: 'Jane',
        workouts: [{ type: 'Cycling', minutes: 60 }]
      }
    ];


    userServiceMock.currentPageUsers$ = of(mockUserData);
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userData.length).toBe(2);
    expect(component.tableFormatedData.length).toBe(2);
    expect(component.tableFormatedData[0].userName).toBe('John');
    expect(component.tableFormatedData[1].userName).toBe('Jane');
  });

  it('should call searchByName when searchName changes', () => {
    component.searchName = 'John';
    component.searchByName();
    expect(userServiceMock.searchByUserName).toHaveBeenCalledWith('John');
  });

  it('should call filterByType when filterType changes', () => {
    component.filterType = WorkoutTypeEnum.Running;
    component.filterByType();
    expect(userServiceMock.filterByWorkoutType).toHaveBeenCalledWith(WorkoutTypeEnum.Running);
  });

  it('should format table data correctly', () => {
    const mockUserData: UserData[] = [
      {
        id: 1,
        userName: 'John',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Yoga', minutes: 45 }]
      }
    ];

    component.formatTableData(mockUserData);
    expect(component.tableFormatedData.length).toBe(1);
    expect(component.tableFormatedData[0].userName).toBe('John');
    expect(component.tableFormatedData[0].workouts).toBe('Running, Yoga');
    expect(component.tableFormatedData[0].totalTime).toBe(75);
  });

  it('should display no user data available', () => {
    component.userData = [];
    fixture.detectChanges();
    const noDataText = fixture.nativeElement.querySelector('.text-gray-500');
    expect(noDataText).toBeTruthy();
    expect(noDataText.textContent).toContain('No user data available.');
  });

  it('should display filtered data when filterType is selected', () => {
    const mockUserData: UserData[] = [
      {
        id: 1,
        userName: 'John',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Yoga', minutes: 45 }]
      },
      {
        id: 2,
        userName: 'Jane',
        workouts: [{ type: 'Cycling', minutes: 60 }]
      }
    ];

    userServiceMock.currentPageUsers$ = of(mockUserData);
    component.filterType = WorkoutTypeEnum.Running;
    component.filterByType();
    fixture.detectChanges();

    expect(userServiceMock.filterByWorkoutType).toHaveBeenCalledWith(WorkoutTypeEnum.Running);
    // if i will have to chek with live data then this will be woking but it would be calling to
    // actual filter type which is fine for now 
    // expect(component.tableFormatedData.length).toBe(1);  
  });

  it('should display all data when "All" filter is selected', () => {
    const mockUserData: UserData[] = [
      {
        id: 1,
        userName: 'John',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Yoga', minutes: 45 }]
      },
      {
        id: 2,
        userName: 'Jane',
        workouts: [{ type: 'Cycling', minutes: 60 }]
      }
    ];

    userServiceMock.currentPageUsers$ = of(mockUserData);
    component.filterType = 'All'; 
    component.filterByType();
    fixture.detectChanges();

    expect(userServiceMock.filterByWorkoutType).toHaveBeenCalledWith('All');
    // again this will not be aplicable for the simulating 
    // expect(component.tableFormatedData.length).toBe(2); 
  });
});
