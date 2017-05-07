Marx = require('./app/javascripts/marx')

document.addEventListener "DOMContentLoaded", () ->
  new Marx(
    controls: 'toggle-advanced'
  )
