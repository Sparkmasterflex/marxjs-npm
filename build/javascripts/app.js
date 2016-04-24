var $, Marx;

$ = require('jquery');

Marx = require('./marx');

$(function() {
  return window.marx = new Marx({
    controls: 'toggle-all'
  });
});
