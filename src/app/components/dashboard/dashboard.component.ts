import { Component, OnInit } from '@angular/core';

import { AccountState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import format from 'date-fns/format';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select(AccountState.isAuthenticated) isAuthenticated!: Observable<boolean>;
  @Select(AccountState.userName) userName!: Observable<string>;

  showCreateFrom = false;

  date = null;

  selectedDates = new Set<string>();

  data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onChange(result: Date): void {
    let resultDate = format(result, 'dd.MM.yyyy');
    if (this.selectedDates.has(resultDate)) {
      this.selectedDates.delete(resultDate);
    } else {
      this.selectedDates.add(resultDate);
    }
  }

  setDateSelection(current: any) {
    return this.selectedDates.has(format(current, 'dd.MM.yyyy'));
  }

  handleShowCreateFrom() {
    this.showCreateFrom = true;
  }

  handleCancelCreate() {
    this.showCreateFrom = false;
  }
}
