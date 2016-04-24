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
$ = require('jquery')

riot.tag2('marx-ipsum', '<h4>Marx Ipsum</h4> <a href="#close" class="marx-ipsum-close">X</a> <div class="marx-container"> <spinner unless="{this.ipsums}"></spinner> <ipsum-para if="{this.ipsums}" each="{this.ipsums}"> {this} </ipsum-para> </div>', '', 'class="{opts.position}"', function(opts) {
});

});