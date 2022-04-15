import { Component, OnInit } from '@angular/core';

import { AccountState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @Select(AccountState.isAuthenticated) isAuthenticated!: Observable<boolean>;
  @Select(AccountState.userName) userName!: Observable<string>;

  constructor() {}

  ngOnInit(): void {}
}
