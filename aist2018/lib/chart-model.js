'use babel'

import {CompositeDisposable, Emitter} from 'atom'

export default class ChartModel {
  constructor(name, dataModel, options = {}) {
    this.name = ''
    this.dataModel = dataModel
    this.scale = 1
    this.chart = null

    this.tpl = {}

    this.subscriptions = new CompositeDisposable
  }

  destroy() {
    this.subscriptions.dispose()
  }

  addData () {

  }

  getModel() {
    return this.tpl
  }

  getChart() {
    return this.chart
  }

  getDataModel() {
    return this.dataModel
  }
  // setChart (chart) {
  //   this.subscriptions.add(this.dataModel.onDidUpdate(() => chart.update()))
  //   this.chart = chart
  // }

  update() {
    this.tpl.data.push(this.dataModel.getData());
    // this.chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(this.dataModel.getData());
    // });
    // canvasChart.update();
  }
}
