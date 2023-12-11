import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { UserData } from '../../types/userData.ts';

export const authorizationStatusSelector = (
  state: State,
): AuthorizationStatus => state[NameSpace.User].authorizationStatus.data;

export const errorAuthorizationStatusSelector = (state: State): string | null =>
  state[NameSpace.User].authorizationStatus.error;

export const loadingStatusAuthorizationStatusSelector = (
  state: State,
): boolean => state[NameSpace.User].authorizationStatus.loading;

export const userDataSelector = (state: State): UserData | null =>
  state[NameSpace.User].userData.data;

export const errorUserDataSelector = (
  state: State,
): { property: string[]; messages: string[] } =>
  state[NameSpace.User].userData.error;

export const loadingStatusUserDataSelector = (state: State): boolean =>
  state[NameSpace.User].userData.loading;
