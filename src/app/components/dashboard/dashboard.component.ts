import { Component, OnInit } from '@angular/core';

import { AccountState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select(AccountState.isAuthenticated) isAuthenticated!: Observable<boolean>;
  @Select(AccountState.userName) userName!: Observable<string>;

  showCreateFrom = false;

  constructor() {}

  ngOnInit(): void {}

  handleShowCreateFrom() {
    this.showCreateFrom = true;
  }

  handleCancelCreate() {
    this.showCreateFrom = false;
  }
}
