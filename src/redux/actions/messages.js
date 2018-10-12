import { INIT } from '../reducers/messages';

export const SET_MESSAGES = 'SET_MESSAGES';

export function setMessages(messages) {
    if (messages) {
        return {
            type: SET_MESSAGES,
            payload: messages
        }
    }
    // Empty messages in store if no messages is sent
    return {
      type: SET_MESSAGES,
      payload: INIT
    }
}
