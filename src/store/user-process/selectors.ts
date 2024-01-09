import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { UserData } from '../../types/userData.ts';

export const authorizationStatusSelector = (
  state: State,
): AuthorizationStatus => state[NameSpace.User].authorizationStatus.data;

export const userDataSelector = (state: State): UserData | null =>
  state[NameSpace.User].userData.data;

export const errorUserDataSelector = (
  state: State,
): { property: string[]; messages: string[] } =>
  state[NameSpace.User].userData.error;
