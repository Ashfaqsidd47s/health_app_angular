import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { RowCountEnum } from '../../constants/user.enum';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  userService = inject(UserService);
  currentPage: number = this.userService.currentPage;
  rowCount: RowCountEnum = this.userService.rowCount;

  allRowCounts : RowCountEnum[] = Object.values(RowCountEnum).filter((v)=> typeof v === "number");
  
  nextPage() {
    this.userService.nextPage();
  }

  prevPage() {
    this.userService.prevPage();
  }

  changePage(page: number) {
    this.userService.updatePage(page);
  }

  changeRowCount(rowCount: RowCountEnum) {
    this.userService.updateRowCount(rowCount);
  }

  get pages() {
    return Array.from({ length: this.userService.totalPages }, (_, i) => i + 1);
  }

  get currentPageData() {
    return this.userService.getCurrentPageData();
  }
}
