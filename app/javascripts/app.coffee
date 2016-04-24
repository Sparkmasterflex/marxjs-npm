$ = require('jquery')
Marx = require('./marx')

$ ->
  window.marx = new Marx(
    controls: 'toggle-all'
  )