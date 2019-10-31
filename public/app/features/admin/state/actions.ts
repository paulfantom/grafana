import { actionCreatorFactory } from 'app/core/redux';
import config from 'app/core/config';
import { ThunkResult, SyncInfo, UserSession, User } from 'app/types';
import {
  getUserInfo,
  getUser,
  getUserSessions,
  revokeUserSession,
  revokeAllUserSessions,
} from './apis';

// Action types

export const userLoadedAction = actionCreatorFactory<User>('USER_LOADED').create();
export const userSessionsLoadedAction = actionCreatorFactory<UserSession[]>('USER_SESSIONS_LOADED').create();
export const userSyncFailedAction = actionCreatorFactory('USER_SYNC_FAILED').create();
export const revokeUserSessionAction = actionCreatorFactory('REVOKE_USER_SESSION').create();
export const revokeAllUserSessionsAction = actionCreatorFactory('REVOKE_ALL_USER_SESSIONS').create();

// Actions

export function loadUserMapping(username: string): ThunkResult<void> {
  return async dispatch => {
    try {
      const userInfo = await getUserInfo(username);
      dispatch(userMappingInfoLoadedAction(userInfo));
    } catch (error) {
      error.isHandled = true;
      const userError = {
        title: error.data.message,
        body: error.data.error,
      };
      dispatch(clearUserMappingInfoAction());
      dispatch(userMappingInfoFailedAction(userError));
    }
  };
}

export function clearUserError(): ThunkResult<void> {
  return dispatch => {
    dispatch(clearUserErrorAction());
  };
}

export function clearUserMappingInfo(): ThunkResult<void> {
  return dispatch => {
    dispatch(clearUserErrorAction());
    dispatch(clearUserMappingInfoAction());
  };
}

export function loadUserSessions(userId: number): ThunkResult<void> {
  return async dispatch => {
    const sessions = await getUserSessions(userId);
    dispatch(userSessionsLoadedAction(sessions));
  };
}

export function revokeSession(tokenId: number, userId: number): ThunkResult<void> {
  return async dispatch => {
    await revokeUserSession(tokenId, userId);
    dispatch(loadUserSessions(userId));
  };
}

export function revokeAllSessions(userId: number): ThunkResult<void> {
  return async dispatch => {
    await revokeAllUserSessions(userId);
    dispatch(loadUserSessions(userId));
  };
}
