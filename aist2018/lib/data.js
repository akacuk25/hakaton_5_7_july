'use babel'

import {CompositeDisposable, Emitter} from 'atom'
import _ from 'underscore'
const csv = require('csv-streamify')
const fs = require('fs')

export default class DataColumn {
  constructor() {
    this._data = [] // original
    this.data = []

    this.subscriptions = new CompositeDisposable
    this.emitter = new Emitter
  }

  parse(filename) {
    return new Promise((resolve, reject) => {
      const parser = csv({columns: false})

      // emits each line as a buffer or as a string representing an array of fields
      parser.on('data', (line) => {
        this.parseLine(line)
      })

      parser.on('finish', (line) => {
        this._data.shift()
        this.data = _.clone(this._data)
        resolve()
      })

      // now pipe some data into it
      fs.createReadStream(filename).pipe(parser)
    })
  }

  parseLine (line) {
    this._data.push(line)
  }

  setData (data) {
    this.data = data
    this.data2 = _.clone(data)
  }

  getData () {
    return this.data != null ? this.data : this._data
  }

  getLabels () {
    return this.labels
  }

  getAllMethods (object) {
      return Object.getOwnPropertyNames(object).filter(function(property) {
          return typeof object[property] == 'function';
      });
  }

  executeMethodByName (functionName, context /*, args */) {
      var args = Array.prototype.slice.call(arguments, 2);
      var namespaces = functionName.split(".");
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
      }
      return context[func].apply(context, args);
  }

  onDidUpdate(callback) {
    return this.emitter.on('did-update', callback)
  }
}
