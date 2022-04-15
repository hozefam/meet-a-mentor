import { Component, OnInit } from '@angular/core';

import { AccountState } from './../../store/account/index';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(AccountState.isAuthenticated) isAuthenticated!: Observable<boolean>;
  @Select(AccountState.userName) userName!: Observable<string>;

  constructor() {}

  ngOnInit(): void {}
}
