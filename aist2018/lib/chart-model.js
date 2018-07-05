'use babel'

export default class ChartModel {
  constructor(name, dataModel, labels, options = {}) {
    this.name = ''
    this.dataModel = dataModel
    this.labels = labels
    this.scale = 1

    this.tpl = {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: labels,
          //labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
              label: name,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: dataModel.getData(),
              // data: [0, 10, 5, 2, 20, 30, 45],
          }]
      },

      // Configuration options go here
      options: {}
    }
  }

  addData () {

  }

  changeScale (value) {

  }

  getDataModel() {

  }
  
  getChart() {
    return this.tpl
  }
}
