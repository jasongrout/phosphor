/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
import {
  ISignal, Signal
} from '@phosphor/signaling';

import {
  IAction
} from './action';

import {
  Reducer
} from './reducer';


/**
 * A lightweight data store which mostly follows the redux pattern.
 *
 * #### Notes
 * The `S` type parameter is an interface defining the state shape.
 *
 * The `A` type parameter is a union type of all actions supported
 * by the instance of the data store.
 *
 * More information on redux can be found at: http://redux.js.org
 */
export
class DataStore<S, A extends IAction> {
  /**
   * Construct a new data store.
   *
   * @param reducer - The root reducer function for the data store.
   *
   * @param state - The initial state for the data store.
   */
  constructor(reducer: Reducer<S, A>, state: S) {
    this._reducer = reducer;
    this._state = state;
  }

  /**
   * A signal emitted when the data store state is changed.
   */
  get changed(): ISignal<this, void> {
    return this._changed;
  }

  /**
   * The current state of the data store.
   *
   * #### Notes
   * The state **must** be treated as immutable.
   *
   * The only way to change the state is to dispatch an action.
   */
  get state(): S {
    return this._state;
  }

  /**
   * Dispatch an action to the data store.
   *
   * @param action - The action to dispatch to the store.
   */
  dispatch(action: A): void {
    // Disallow recursive dispatch.
    if (this._dispatching) {
      throw new Error('Recursive dispatch detected.');
    }

    // Set the dispatch guard.
    this._dispatching = true;

    // Look up the root reducer.
    let reducer = this._reducer;

    // Invoke the reducer.
    try {
      this._state = reducer(this._state, action);
    } finally {
      this._dispatching = false;
    }

    // Emit the `changed` signal.
    this._changed.emit(undefined);
  }

  private _state: S;
  private _dispatching = false;
  private _reducer: Reducer<S, A>;
  private _changed = new Signal<this, void>(this);
}