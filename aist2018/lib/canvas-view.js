/** @babel */
/** @jsx etch.dom */

import etch from 'etch'
import ChartSettings from './chart-settings'

export default class Canvas {
  constructor(control) {
    this.control = control
    etch.initialize(this)
  }

  render () {
    return (
      <div>
        <canvas ref='myChart' id="myChart"></canvas>
        <div ref='settings'></div>
      </div>
    )
  }

  update() {}

  getElement() {
    return this.element
  }

  getCanvasElement() {
    return this.refs.myChart
  }

  addChartLine (chartModel) {
    var el = this.getCanvasElement()
    return new Chart(el, chartModel)
  }

  addChartSettings (dataModel, methods) {
    // methods.forEach((methodName) => {
    //   this.refs.settings.appendChild(new ChartSettings(dataModel, methodName, this).getElement())
    // })
    this.refs.settings.appendChild(new ChartSettings(dataModel, methods[1], this).getElement())
  }

  removeChart() {}

  handleSettingsUpdate(dataModel, methodName) {
    this.control.handleSettingsUpdate(dataModel, methodName, arguments[2], arguments[3], arguments[4])
  }

  destroy() {
    etch.destroy()
  }
}
