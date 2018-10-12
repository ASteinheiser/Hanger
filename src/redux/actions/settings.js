import { INIT } from '../reducers/settings';

export const SET_SETTINGS = 'SET_SETTINGS';

export function setSettings(settings) {
    if (settings) {
        return {
            type: SET_SETTINGS,
            payload: settings
        }
    }
    // Empty settings in store if no settings is sent
    return {
      type: SET_SETTINGS,
      payload: INIT
    }
}
