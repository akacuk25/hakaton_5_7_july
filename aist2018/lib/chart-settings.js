/** @babel */
/** @jsx etch.dom */

import etch from 'etch'
import {TextEditor} from 'atom'

export default class ChartSettings {
  constructor(dataModel, methodName, canvas) {
    this.dataModel = dataModel
    this.methodName = methodName
    this.canvas = canvas
    etch.initialize(this)
  }

  render () {
    // <span ref='paramName1' className='param-name'>Param1</span>
    // <span ref='paramName2' className='param-name'>Param1</span>
    return (
      <div class='settings'>
        <select ref='abc' name='abc' onchange={this.onDidChangeMethod.bind(this)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
        </select>
        <TextEditor ref='paramValue1' mini={true} className='param-value' placeholderText='' />

        <TextEditor ref='paramValue2' mini={true} className='param-value' placeholderText='' />

        <button ref='button' onclick={this.submit.bind(this)} />
      </div>
    )
  }

  update() {}

  getElement() {
    return this.element
  }

  destroy() {
    etch.destroy()
  }

  submit (e) {
    var arg1 = this.refs.paramValue1.getText()
    var arg2 = this.refs.paramValue2.getText()
    this.canvas.handleSettingsUpdate(this.dataModel, this.methodName, arg1, arg2)
  }

  onDidChangeMethod (e) {
    console.log(this.refs.abc, this.refs.abc.value)
  }
  // func() {
  //   var args = this.model.getArguments()
  //   args.forEach((name) => {
  //     var editor = this.refs.paramValueTpl.cloneNode(true)
  //     editor.id = name
  //     this.refs.row.appendChild(editor)
  //   })
  // }
}
