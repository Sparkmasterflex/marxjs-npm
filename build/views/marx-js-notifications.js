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

riot.tag2('marx-js-notifications', '<notification if="{this.alerts}" each="{this.alerts}"> {this.count} {this.element} elements were altered </notification>', '', 'class="marx-{opts.position}"', function(opts) {
});

});