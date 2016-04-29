(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
$ = require('jquery')
riot = require('riot')
riot.tag2('advanced-open-controls', '<div class="open-controls-group"> <a onclick="{marx.populate_whole_form}" href="#populate-whole-form" class="quick-populate" title="Populate Whole Form">Marx.js</a> <a onclick="{marx.open_controls}" href="#standard-controls" class="standard-controls" title="Show Standard Controls">Standard Controls</a> <a onclick="{marx.open_advanced_controls}" href="#advanced-controls" class="advanced-controls" title="Show Advanced Controls">Advanced Controls</a> </div>', '', '', function(opts) {
});

});