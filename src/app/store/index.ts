import { AccountState } from './account/index';
import { GlobalState } from './global/index';

export * from './global';
export * from './account';

export const AppState = [GlobalState, AccountState];
