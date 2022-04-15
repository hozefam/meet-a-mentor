import { Selector, Store } from '@ngxs/store';

import { AccountActions } from 'src/app/store/account';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(new AccountActions.FetchAccount());
  }
}
