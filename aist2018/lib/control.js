'use babel'

export default class Control {
  constructor () {

  }

  handleSettingsUpdate (dataModel, methodName /*, args */) {
    dataModel.executeMethodByName(methodName, dataModel, arguments[2], arguments[3], arguments[4])
  }

  handleCounter (model) {
    model.increaseCounter()
  }
}
