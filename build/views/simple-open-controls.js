(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot = require('riot')
riot.tag2('simple-open-controls', '<a onclick="{this.activate_controls}" href="#open-controls" class="open-controls">Marx.js</a>', '', '', function(opts) {
});

});