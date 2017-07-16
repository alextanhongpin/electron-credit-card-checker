// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const utils = require('./test.js')
const Model = {}
const View = {
  ids: [
    'creditCardNumber',
    'output'
  ],
  classNames: ['cc'],
  data: {},
  getId (id) {
    return this.data[id]
  },
  setId (id) {
    this.data[id] = document.getElementById(id)
  },
  getClassName (className) {
    return this.data[className]
  },
  setClassName (className) {
    this.data[className] = document.querySelectorAll(`.${className}`)
  }
}

class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
  }

  init () {
    this.view.ids.map((id) => {
      if (!this.view.getId(id)) {
        this.view.setId(id)
      }
    })

    this.view.classNames.map((className) => {
      if (!this.view.getClassName(className)) {
        this.view.setClassName(className)
      }
    })

    this.bindEvents()
  }
  bindEvents () {
    this.view.getId('creditCardNumber').addEventListener('keyup', (evt) => {
      const value = evt.currentTarget.value
      console.log(utils(value))
      const issuer = utils(value) ? utils(value).issuing_network : ''
      const className = issuer.toLowerCase().split(' ').join('-')
      this.view.getClassName('cc').forEach((el) => {
        if (el.classList.contains(`cc-${className}`)) {
          el.classList.remove('is-disabled')
        } else {
          el.classList.add('is-disabled')
        }
      })

      this.view.getId('output').innerHTML = issuer
    }, false)
  }
}

const controller = new Controller(Model, View)
controller.init()
