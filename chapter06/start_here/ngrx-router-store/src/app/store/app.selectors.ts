import { createSelector, createFeatureSelector, select } from '@ngrx/store';
import { IUser } from '../core/interfaces/user.interface';
import { AppState } from './app.reducer';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

export const selectApp = createFeatureSelector<AppState>('app');
export const selectUsers = createSelector(
  selectApp,
  (state: AppState) => state.users
);
export const selectRouter = createFeatureSelector<
  AppState,
  RouterReducerState<any>
>('router');

const { selectRouteParam } = getSelectors(selectRouter);
export const selectUserUUID = selectRouteParam('uuid');

/* export const selectCurrentUser = (uuid) => createSelector(
  selectUsers, (users: IUser[]) => users ? users.find(user => {
    return user.login.uuid === uuid }) : null
); */
export const selectCurrentUser = createSelector(
  selectUserUUID, selectUsers, (uuid, users: IUser[]) =>
    users ? users.find((user) => user.login.uuid === uuid) : null
);

/* export const selectSimilarUsers = (uuid) => createSelector(
  selectUsers, (users: IUser[]) => users ? users.filter(user => {
    return user.login.uuid !== uuid }): null
); */
export const selectSimilarUsers = createSelector(
  selectUserUUID, selectUsers, (uuid, users: IUser[]) =>
    users ? users.filter(user => user.login.uuid !== uuid) : null
);
