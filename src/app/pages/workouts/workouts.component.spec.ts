import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutsComponent } from './workouts.component';
import { WorkouttableComponent } from '../../components/workouttable/workouttable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, WorkouttableComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the  WorkouttableComponent inside ', () => {
    const section = fixture.debugElement.query(By.css('section')); // Find <main>
    expect(section).toBeTruthy();

    const workoutTable = section.query(By.directive(WorkouttableComponent)); 
    expect(workoutTable).toBeTruthy(); 
  });

  
});
