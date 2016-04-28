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
riot.tag2('marx-js-controls', '<link rel="stylesheet" href="build/stylesheets/base.css"> <marx-js-open></marx-js-open> <standard-controls> <control each="{standard}"> <a href="#{this.action}" class="{this.action}">Go</a> <p>{this.label}</p> </control> <toggle-advanced if="{opts.toggle_advanced}"></toggle-advanced> </standard-controls> <advanced-controls if="{opts.advanced}"> <control each="{advanced}" settings="{opts.settings}"> <a href="#{this.action}" class="{this.action}">Go</a> <p> {this.label} <ipsum if="{this.html}" settings="{opts.settings}"></ipsum> </p> </control> </advanced-controls>', '', 'class="marx-{opts.settings.position}"', function(opts) {
this.standard = [
  {
    action: 'populate-whole-form',
    label: 'Populate Whole Form',
    key: 1
  }, {
    action: 'populate-textareas',
    label: 'Populate TextAreas',
    key: 2
  }, {
    action: 'populate-inputs',
    label: 'Populate Inputs',
    key: 3
  }, {
    action: 'populate-checkboxes',
    label: 'Populate Check Boxes',
    key: 4
  }, {
    action: 'populate-radios',
    label: 'Populate Radio Buttons',
    key: 5
  }, {
    action: 'populate-selects',
    label: 'Populate Select Boxes',
    key: 6
  }
];

this.advanced = [
  {
    action: 'clear-form',
    label: 'Clear Form',
    key: 7
  }, {
    action: 'populate-submit',
    label: 'Populate and Submit',
    key: 8
  }, {
    action: 'show-hidden',
    label: 'Show Hidden Fields',
    key: 9
  }, {
    action: 'expand-select',
    label: 'Expand Select Boxes',
    key: 0
  }, {
    action: 'random-image',
    label: 'Download Random Image',
    key: '$'
  }, {
    action: 'generate-ipsum',
    label: "Generate Ipsum",
    key: '%',
    html: 'ipsum'
  }
];
});


riot.tag2('ipsum', '<input value="{opts.settings.ipsum}" max="{opts.settings.max_ipsum}" type="{\'number\'}"> <span>Paragraphs</span>', '', '', function(opts) {
});

riot.tag2('toggle-advanced', '<a onclick="{marx.toggle_advanced}" href="#advanced" class="marx-toggle-advanced">&laquo; Advanced</a>', '', '', function(opts) {
});

});