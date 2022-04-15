import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Injectable } from '@angular/core';

export class GlobalStateModel {
  x?: string;
}

export namespace GlobalActions {
  export class setX {
    static readonly type = '[X] setX';
    constructor(public payload: string) {}
  }
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: {
    x: '',
  },
})
@Injectable()
export class GlobalState {
  @Selector()
  static getX(state: GlobalStateModel) {
    return state.x;
  }

  @Action(GlobalActions.setX)
  setX(
    { patchState }: StateContext<GlobalStateModel>,
    action: GlobalActions.setX
  ) {
    let x = action.payload;
    console.log('Setting x ', x);
    patchState({
      x: x,
    });
  }
}
