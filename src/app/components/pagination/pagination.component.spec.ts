import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { UserService } from '../../services/user/user.service';
import { RowCountEnum } from '../../constants/user.enum';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['nextPage', 'prevPage', 'updatePage', 'updateRowCount', 'getCurrentPageData'], {
      currentPage: 1,
      totalPages: 5,
      rowCount: RowCountEnum.Five,
      getCurrentPageData: of([])
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgFor],
      providers: [{ provide: UserService, useValue: userService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextPage when next button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector('#next-button');
    nextButton.click();
    fixture.detectChanges();
    expect(userService.nextPage).toHaveBeenCalled();
  });

  it('should call updatePage with the correct page when a page button is clicked', () => {
    const pageButtons = fixture.nativeElement.querySelectorAll('button');
    pageButtons[1].click();  
    fixture.detectChanges();
    expect(userService.updatePage).toHaveBeenCalledWith(1);
  });

  it('should disable prev button on first page', () => {
    userService.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.nativeElement.querySelector('#prev-button');
    expect(prevButton.disabled).toBeTruthy();
  });

  it('should call updateRowCount with the correct value when row count is changed', () => {
    const select = fixture.nativeElement.querySelector('select');
    select.value = RowCountEnum.Ten; 
    select.dispatchEvent(new Event('change'));  
    fixture.detectChanges();
    expect(userService.updateRowCount).toHaveBeenCalledWith(jasmine.anything()); 
    expect(userService.updateRowCount.calls.mostRecent().args[0] == RowCountEnum.Ten).toBeTrue();
  });
});
