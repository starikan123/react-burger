import { IUserProfile } from "./profileForm";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED" as const;
export const SET_USER = "SET_USER" as const;
export const REMOVE_USER_DATA = "REMOVE_USER_DATA" as const;

export interface IUser {
  email: string;
  username: string;
}

export interface ISetAuthCheckedAction {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}

export interface ISetUserAction {
  type: typeof SET_USER;
  payload: IUser;
}

export interface IRemoveUserDataAction {
  type: typeof REMOVE_USER_DATA;
}

export type TCheckAuthActions =
  | ISetAuthCheckedAction
  | ISetUserAction
  | IRemoveUserDataAction;

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (userProfile: IUserProfile): ISetUserAction => ({
  type: SET_USER,
  payload: {
    email: userProfile.email,
    username: userProfile.name,
  },
});

export const removeUserData = (): IRemoveUserDataAction => ({
  type: REMOVE_USER_DATA,
});
