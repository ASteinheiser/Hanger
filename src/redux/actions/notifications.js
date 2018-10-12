import { INIT } from '../reducers/notifications';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export function setNotifications(notifications) {
    if (notifications) {
        return {
            type: SET_NOTIFICATIONS,
            payload: notifications
        }
    }
    // Empty notifications in store if no notifications is sent
    return {
      type: SET_NOTIFICATIONS,
      payload: INIT
    }
}
