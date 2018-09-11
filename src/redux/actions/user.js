import { INIT } from '../reducers/user';

export const SET_USER = "SET_USER";

export function setUser(user) {
    if (user) {
        return {
            type: SET_USER,
            payload: user
        }
    }
    // Empty user in store if no user is sent
    return {
      type: SET_USER,
      payload: INIT
    }
}
