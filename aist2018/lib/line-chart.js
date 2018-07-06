'use babel'

import ChartModel from './chart-model'
import {CompositeDisposable, Emitter} from 'atom'

export default class LineChart extends ChartModel {
  constructor(name, dataModel, options = {}) {
    super(name, dataModel, options)
    this.tpl = {
        type: 'line',
        label: name,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataModel.getData(),
        labels: dataModel.getLabels()
    }
  }
}
