/** @babel */
/** @jsx etch.dom */

import etch from 'etch'
import chartjs from 'chart.js'
import {CompositeDisposable, Emitter} from 'atom'

export default class Aist2018View {

  constructor(model, control) {
    this.control = control
    this.model = model

    this.subscriptions = new CompositeDisposable()

    etch.initialize(this)
  }

  render () {
    return (
      <div class='aist2018'>
        <div ref='canvases'></div>
      </div>
    )
  }

  update (props, children) {
    return etch.update(this)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.subscriptions.dispose()
    etch.destroy()
  }

  getElement() {
    return this.element;
  }

  addCanvas (el) {
    this.refs.canvases.appendChild(el)
    return
  }
}
