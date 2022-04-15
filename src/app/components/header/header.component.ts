import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { AccountActions } from 'src/app/store/account';
import { AccountState } from './../../store/account/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(AccountState.isAuthenticated) isAuthenticated!: Observable<boolean>;
  @Select(AccountState.userName) userName!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleLogout() {
    this.store.dispatch(new AccountActions.Logout());
  }
}
