/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
module phosphor.collections {

/**
 * A canonical singly linked FIFO queue.
 */
export
class Queue<T> implements IQueue<T> {
  /**
   * Construct a new queue.
   */
  constructor(items?: IIterable<T> | T[]) {
    if (items !== void 0) forEach(items, it => { this.pushBack(it) });
  }

  /**
   * True if the queue has elements, false otherwise.
   */
  get empty(): boolean {
    return this._m_size === 0;
  }

  /**
   * The number of elements in the queue.
   */
  get size(): number {
    return this._m_size;
  }

  /**
   * The value at the front of the queue.
   */
  get front(): T {
    return this._m_front !== null ? this._m_front.value : void 0;
  }

  /**
   * The value at the back of the queue.
   */
  get back(): T {
    return this._m_back !== null ? this._m_back.value : void 0;
  }

  /**
   * Get an iterator for the elements in the queue.
   */
  iterator(): IIterator<T> {
    return new QueueIterator(this._m_front);
  }

  /**
   * Test whether the queue contains the given value.
   */
  contains(value: T): boolean {
    var link = this._m_front;
    while (link !== null) {
      if (link.value === value) {
        return true;
      }
      link = link.next;
    }
    return false;
  }

  /**
   * Add a value to the end of the queue.
   *
   * This method always succeeds.
   */
  add(value: T): boolean {
    this.pushBack(value);
    return true;
  }

  /**
   * Push a value onto the back of the queue.
   */
  pushBack(value: T): void {
    var link: IQueueLink<T> = { next: null, value: value };
    if (this._m_back === null) {
      this._m_front = link;
      this._m_back = link;
    } else {
      this._m_back.next = link;
      this._m_back = link;
    }
    this._m_size++;
  }

  /**
   * Pop and return the value at the front of the queue.
   */
  popFront(): T {
    var link = this._m_front;
    if (link === null) {
      return void 0;
    }
    if (link.next === null) {
      this._m_front = null;
      this._m_back = null;
    } else {
      this._m_front = link.next;
    }
    this._m_size--;
    return link.value;
  }

  /**
   * Remove the first matching value from the queue.
   *
   * Returns false if the value is not in the queue.
   */
  remove(value: T): boolean {
    var link = this._m_front;
    var prev: typeof link = null;
    while (link !== null) {
      if (link.value === value) {
        if (prev === null) {
          this._m_front = link.next;
        } else {
          prev.next = link.next;
        }
        if (link.next === null) {
          this._m_back = prev;
        }
        this._m_size--;
        return true;
      }
      prev = link;
      link = link.next;
    }
    return false;
  }

  /**
   * Remove all values from the queue.
   */
  clear(): void {
    this._m_size = 0;
    this._m_front = null;
    this._m_back = null;
  }

  private _m_size = 0;
  private _m_front: IQueueLink<T> = null;
  private _m_back: IQueueLink<T> = null;
}


/**
 * A link node in a queue.
 */
interface IQueueLink<T> {
  /**
   * The next link in the chain.
   */
  next: IQueueLink<T>;

  /**
   * The value for the link.
   */
  value: T;
}


/**
 * An iterator for a Queue.
 */
class QueueIterator<T> implements IIterator<T> {
  /**
   * Construct a new queue iterator.
   */
  constructor(link: IQueueLink<T>) {
    this._link = link;
  }

  /**
   * The current value of the iterable.
   *
   * Returns `undefined` if there is no current value.
   */
  get current(): T {
    return this._current;
  }

  /**
   * Move the iterator to the next value.
   *
   * Returns true on success, false when the iterator is exhausted.
   */
  moveNext(): boolean {
    if (this._link === null) {
      return false;
    }
    this._current = this._link.value;
    this._link = this._link.next;
    return true;
  }

  /**
   * Returns `this` to make the iterator iterable.
   */
  iterator(): IIterator<T> {
    return this;
  }

  private _link: IQueueLink<T>;
  private _current: T = void 0;
}

} // module phosphor.collections
