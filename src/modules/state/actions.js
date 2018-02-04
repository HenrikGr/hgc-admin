/*!
 * Description: Module for the applications action creators
 *
 * GENERAL
 * Action creators might seem like a circuitous way to come up with an action object.
 * It would be simpler to specify the actions directly. However, implementing action
 * creators typically in one file, or a handful of files, makes it easy to locate the
 * code for your application's actions, which in effect serves as a form of documentation.
 *
 * Encapsulate the creation of actions in functions, making your code more readable.
 *
 * ACTIONS
 * With Redux, we can't modify application state. Instead, we replace the existing
 * state with a new state. The new state is specified by actions, which are immutable
 * objects that describe state changes.
 *
 * Encapsulation of state changes in immutable objects has many advantages.
 * One of those advantages, is the ability to implement endless undo and redo
 * functionality, in effect, a sort of time machine.
 *
 * Actions are also executed in a strict order, so no race conditions occur.
 *
 *
 * NOTE:
 * fetchCurrentTopic() is invoked by the thunk middleware implemented in ./middleware.js.
 * That middleware calls fetchCurrentTopic() and passes it the dispatch and state.
 *
 *
 * Author:  Henrik Grönvall
 * File:
 * Version: 0.0.1
 * Created on 2016-10-16
 */



export const setUser = (user) => ({
  type: 'SET_USER',
  user
});

export const setClient = (client) => ({
  type: 'SET_CLIENT',
  client
});


