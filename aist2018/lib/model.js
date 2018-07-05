'use babel'

import { Emitter } from 'atom';

export default class Model {
  constructor () {
    this._counter = 1

    this.emitter = new Emitter()
  }

  increaseCounter () {
    this.counter++
    this.emitter.emit('did-update')
  }

  get counter() { return this._counter }
  set counter(value) { this._counter = value + 1 }

  onDidUpdate (callback) {
    return this.emitter.on('did-update', callback)
  }

  destroy () {
    this.emitter.emit('did-destroy')
  }
}
