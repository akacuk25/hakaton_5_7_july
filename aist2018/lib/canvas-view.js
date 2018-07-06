/** @babel */
/** @jsx etch.dom */

import etch from 'etch'
import ChartSettings from './chart-settings'
import {CompositeDisposable, Emitter} from 'atom'

export default class Canvas {
  constructor(control) {
    this.control = control
    etch.initialize(this)

    this.tpl = {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: [0],
          datasets: [
          {
            label: 'zero',
            data: [{x:0, y:0}],
            type: 'bubble'
          }
        ]
      },

      // Configuration options go here
      // options: {}
    }
    this.canvasChart = new Chart(this.refs.myChart, this.tpl)

    this.subscriptions = new CompositeDisposable
  }

  render () {
    return (
      <div>
        <canvas ref='myChart' id="myChart"></canvas>
        <div ref='settings' className='settings'></div>
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

  addChart (chartModel) {
    var el = this.getCanvasElement()
    var dataModel = chartModel.getDataModel()
    this.canvasChart.data.labels = dataModel.getLabels()
    this.canvasChart.data.datasets.push(chartModel.getModel())
    this.canvasChart.update()

    var methods = dataModel.getAllMethods(dataModel.getNamespace())
    this.addChartSettings(dataModel, methods)

    this.subscriptions.add(dataModel.onDidUpdate(() => {
      chartModel.update()
      this.canvasChart.data.labels = dataModel.getLabels()
      this.canvasChart.update()
    }))
  }

  // addChartLineTo (chartModel) {
  //   var el = this.getCanvasElement()
  //   var chart = new Chart(el, chartModel.getModel())
  //   chartModel.setChart(chart)
  // }

  addChartSettings (dataModel, methods) {
    methods.forEach((methodName) => {
      if (methodName.substr(0,6) == 'method') {
        this.refs.settings.appendChild(new ChartSettings(dataModel, methodName.substr(6), this).getElement())
      }
    })
  }

  removeChart() {}

  handleSettingsUpdate(dataModel, methodName) {
    this.control.handleSettingsUpdate(dataModel, 'method' + methodName, arguments[2], arguments[3], arguments[4])
  }

  destroy() {
    etch.destroy()
    this.subscriptions.dispose()
  }
}
