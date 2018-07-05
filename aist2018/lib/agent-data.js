'use babel'

import Data from './data'

export default class Agent extends Data {
  constructor(data) {
    super(data)
  }

  method1 (arg1) {
    console.log('Im method one' + arg1)
  }

  methodB (arg1) {
    console.log('Im method one' + arg1)
  }

  getNamespace() {
    return Agent.prototype
  }
}
