'use babel'


import Aist2018View from './aist2018-view';
import Control from './control';
import Model from './model';

import { CompositeDisposable } from 'atom';

var name = 'First'
var data = [10, 15, 13]
var labels = [1,2,3]

export default {

  aistView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    let model = new Model()
    let control = new Control()
    this.aistView = new Aist2018View(model, control)

    var Agent = require('./agent-data')
    var dataModel = new Agent(data)

    var ChartModel = require('./chart-model')
    var chartModel = new ChartModel(name, dataModel, labels)

    var Canvas = require('./canvas-view')
    var canvas = new Canvas(control)
    var chart = canvas.addChartLine(chartModel.getChart())

    var methods = dataModel.getAllMethods(dataModel.getNamespace())
    canvas.addChartSettings(dataModel, methods)

    // canvas.element.onclick = function(evt){
    //     var activePoints = chart.getElementsAtEvent(evt);
    //     console.log('points:', activePoints)
    //     // => activePoints is an array of points on the canvas that are at the same position as the click event.
    // }
    this.aistView.addCanvas(canvas.getElement())

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aistView.getElement(),
      visible: false
    });
    //
    //
    // var methods = agent.getAllMethods(Agent.prototype)
    //
    // console.log(agent.executeMethodByName(methods[1], agent, 'abc'));

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aist2018:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aistView.destroy();
  },

  serialize() {
    return {
      aist2018ViewState: this.aistView.serialize()
    };
  },

  toggle() {
    console.log('Aist2018 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
