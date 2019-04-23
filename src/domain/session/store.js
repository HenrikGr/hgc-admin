function createSessionStore(reducer, initialState) {
  /**
   * Initial session store
   */
  let state = initialState

  /**
   * Set up listeners to keep track of state changes
   * @type {Array}
   */
  const listeners = []

  /**
   * Subscription function
   * @param listener
   * @returns {number}
   */
  const subscribe = listener => listeners.push(listener)

  /**
   * Get state function
   * @returns {*}
   */
  const getState = () => state

  /**
   * Dispatcher
   * @param action
   */
  const dispatch = action => {
    state = reducer(state, action)
    // call each listener function when the state is changed
    // its just a notification that state is changed
    listeners.forEach(l => l())
  }

  return {
    subscribe,
    getState,
    dispatch
  }
}

/**
 * Session store reducer
 * @param state
 * @param action
 * @returns {*}
 */
function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    }
  }

  if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length)
      ]
    }
  }

  return state
}

// set initial state to pass into to store
const initialState = { messages: [] }
// initialize the store
const store = createSessionStore(reducer, initialState)
