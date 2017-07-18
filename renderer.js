// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {clipboard} = require('electron')

const utils = require('./test.js')
const luhn = require('./luhn.js')
const Model = {}
const View = {
  ids: [
    'creditCardNumber',
    'output',
    'randomize',
    'copy'
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
    this.view.getId('randomize').addEventListener('click', (evt) => {
      let creditCardNumber = Math.floor(Math.random() * 9999999999999999)

      while (!luhn(creditCardNumber)) {
        creditCardNumber = Math.floor(Math.random() * 9999999999999999)
      }

      this.view.getId('creditCardNumber').value = creditCardNumber
      // console.log(utils(creditCardNumber))
      const issuer = utils(creditCardNumber.toString()) ? utils(creditCardNumber.toString()).issuing_network : ''
      const preMappedValue = issuer.toLowerCase().split(' ').join('-')
      let className = preMappedValue

      if (className.indexOf('diners') !== -1) {
        className = 'diners'
      }
      this.view.getClassName('cc').forEach((el) => {
        if (el.classList.contains(`cc-${className}`)) {
          el.classList.add('is-active')
        } else {
          el.classList.remove('is-active')
        }
      })
      this.view.getId('output').innerHTML = issuer
    }, false)

    this.view.getId('copy').addEventListener('click', (evt) => {
      clipboard.writeText(this.view.getId('creditCardNumber').value)
    }, false)

    this.view.getId('creditCardNumber').addEventListener('keyup', (evt) => {
      const value = evt.currentTarget.value

      const issuer = utils(value) ? utils(value).issuing_network : ''
      const preMappedValue = issuer.toLowerCase().split(' ').join('-')
      let className = preMappedValue

      if (className.indexOf('diners') !== -1) {
        className = 'diners'
      }
      this.view.getClassName('cc').forEach((el) => {
        if (el.classList.contains(`cc-${className}`)) {
          el.classList.add('is-active')
        } else {
          el.classList.remove('is-active')
        }
      })

      this.view.getId('output').innerHTML = issuer
    }, false)
  }
}

const controller = new Controller(Model, View)
controller.init()
