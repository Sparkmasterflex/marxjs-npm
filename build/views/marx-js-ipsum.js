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

riot.tag2('marx-js-ipsum', '<h4>Marx Ipsum</h4> <a onclick="{this.close_ipsum}" href="#close" class="marx-ipsum-close">X</a> <div class="marx-container"> <spinner if="{!this.ipsums}"></spinner> <ipsum-para if="{this.ipsums}" each="{this.ipsums}"> {this.body} </ipsum-para> </div>', '', 'class="marx-{opts.position}"', function(opts) {
var num;

num = marx.$('ipsum input').val();

$.getJSON(opts.url + "/monologues", (function(_this) {
  return function(data) {
    var max;
    max = num > data.length ? data.length - 1 : num;
    _this.ipsums = data.sort(function() {
      return 0.5 - Math.random();
    });
    return _this.update();
  };
})(this));

this.close_ipsum = function(e) {
  $('marx-js-ipsum').slideUp('fast');
  return false;
};
});

});