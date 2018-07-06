'use babel'

import Data from './data'

export default class Agent extends Data {
  constructor() {
    super()

    this.traders = new Map()
    // this.from = []
    // this.to = []
    // this.value = []
    // this.time = []
  }

  parseLine (r) {
    var from = r[0],
        to = r[1],
        value = r[2] / 1.e+18,
        time = r[3]

    var seller = this.traders.get(from)
    var buyer = this.traders.get(to)

    if (seller == undefined) {
        seller = this.addTrader(from)
    }
    if (buyer == undefined) {
        buyer = this.addTrader(to)
    }
    this.addValue(seller, -value, time)
    this.addValue(buyer, value, time)

    this._data.push({from, to, value, time})
    // this.from.push(r.from)
    // this.to.push(r.to)
    // this.value.push(r.value)
    // this.time.push(r.timestamp)
  }

  getData() {
    var data = []
    this.data.forEach((line) => {
      data.push(line.from)
    })
    return data
  }

  getLabels() {
    var data = []
    this.data.forEach((line) => {
      data.push(line.time)
    })
    return data
  }

  methodGetTrader (arg1) {
    var data = []
    this.traders.forEach((line, i) => {
      if (trader.values.length >= arg1) {
        data.push()
      }
      line.from = line.from + Number(arg1)
    })
    console.log('Im method 1 ' + arg1)
    this.emitter.emit('did-update')
  }

  methodB (arg1) {
    console.log('Im method B ' + arg1)
    this.emitter.emit('did-update')
  }

  getNamespace() {
    return Agent.prototype
  }

  addTrader(id) {
    var trader = {values: [], time: []}
    this.traders.set(id, trader)
    return trader
  }
  addValue (trader, value, time) {
    trader.values.push(value)
    trader.time.push(time)
  }
}
