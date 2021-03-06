import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';

import { Api } from './../../helpers/api';
import { Models } from 'appwrite';
import { Router } from '@angular/router';

@Injectable()
export class AccountStateModel {
  account?: Models.User<{}> | null;
}

export namespace AccountActions {
  export class Signup {
    static readonly type = '[Auth] Signup';
    constructor(
      public payload: { email: string; password: string; name: string }
    ) {}
  }

  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string; password: string }) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class FetchAccount {
    static readonly type = '[Auth] FetchAccount';
  }

  export class Redirect {
    static readonly type = '[Auth] AccountRedirect';
    constructor(public payload: { path: string }) {}
  }
}

@State<AccountStateModel>({
  name: 'auth',
  defaults: {
    account: null,
  },
})
@Injectable()
export class AccountState {
  constructor(private router: Router, private ngZone: NgZone) {}

  @Selector()
  static isAuthenticated(state: AccountStateModel): boolean {
    return !!state.account;
  }

  @Selector()
  static userName(state: AccountStateModel): string {
    return state?.account?.name ?? '';
  }

  @Action(AccountActions.Signup)
  async Signup(
    { patchState, dispatch }: StateContext<AccountStateModel>,
    action: AccountActions.Signup
  ) {
    let { email, password, name } = action.payload;
    try {
      let account = await Api.provider().account.create(
        'unique()',
        email,
        password,
        name
      );
      let session = await Api.provider().account.createSession(email, password);
      patchState({
        account,
      });
      dispatch(new AccountActions.Redirect({ path: '/dashboard' }));
    } catch (e: any) {
      console.log('Error creating Account');
    }
  }

  @Action(AccountActions.Login)
  async Login(
    { patchState, dispatch }: StateContext<AccountStateModel>,
    action: AccountActions.Login
  ) {
    let { email, password } = action.payload;

    try {
      await Api.provider().account.createSession(email, password);
      let account = await Api.provider().account.get();

      patchState({
        account: account,
      });
      dispatch(new AccountActions.Redirect({ path: '/dashboard' }));
    } catch (e: any) {
      console.log('Error Logging in');
    }
  }

  @Action(AccountActions.Logout)
  async Logout(
    { patchState, dispatch }: StateContext<AccountStateModel>,
    action: AccountActions.Logout
  ) {
    try {
      await Api.provider().account.deleteSession('current');
      patchState({
        account: null,
      });
      dispatch(new AccountActions.Redirect({ path: '' }));
    } catch (e: any) {
      console.log('Error Loggin Out');
    }
  }

  @Action(AccountActions.FetchAccount)
  async FetchAccount(
    { patchState }: StateContext<AccountStateModel>,
    action: AccountActions.FetchAccount
  ) {
    try {
      let account = await Api.provider().account.get();
      patchState({
        account: account,
      });
    } catch (e: any) {
      console.log('Error Fetching account');
    }
  }

  @Action(AccountActions.Redirect)
  redirect(
    ctx: StateContext<AccountStateModel>,
    action: AccountActions.Redirect
  ) {
    const { path } = action.payload;
    this.ngZone.run(() => {
      this.router.navigate([path]);
    });
  }
}
