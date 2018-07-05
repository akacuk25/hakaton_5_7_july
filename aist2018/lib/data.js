'use babel'

export default class DataColumn {
  constructor(data) {
    this.data = data
  }

  getData () {
    return this.data
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
}
