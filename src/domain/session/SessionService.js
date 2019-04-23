

import EventEmitter from './EventEmitter'


class SessionService extends EventEmitter {
  constructor(id, subject) {
    super()
    this._id = id
    this._subject = subject
    this._subject.addListener('change', data => this.onChange(data))
  }

  onChange(data) {
    console.log(`${this._id} notified of change:`, data)
  }
}