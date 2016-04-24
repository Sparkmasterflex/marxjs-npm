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
    label: 'Populate Whole Form'
  }, {
    action: 'populate-textareas',
    label: 'Populate TextAreas'
  }, {
    action: 'populate-inputs',
    label: 'Populate Inputs'
  }, {
    action: 'populate-checkboxes',
    label: 'Populate Check Boxes'
  }, {
    action: 'populate-radios',
    label: 'Populate Radio Buttons'
  }, {
    action: 'populate-selects',
    label: 'Populate Select Boxes'
  }
];

this.advanced = [
  {
    action: 'clear-form',
    label: 'Clear Form'
  }, {
    action: 'populate-submit',
    label: 'Populate and Submit'
  }, {
    action: 'show-hidden',
    label: 'Show Hidden Fields'
  }, {
    action: 'expand-select',
    label: 'Expand Select Boxes'
  }, {
    action: 'random-image',
    label: 'Download Random Image'
  }, {
    action: 'generate-ipsum',
    label: "Generate Ipsum",
    html: 'ipsum'
  }
];
});


riot.tag2('ipsum', '<input value="{opts.settings.ipsum}" max="{opts.settings.max_ipsum}" type="{\'number\'}"> <span>Paragraphs</span>', '', '', function(opts) {
});

riot.tag2('toggle-advanced', '<a onclick="{marx.toggle_advanced}" href="#advanced" class="marx-toggle-advanced">&laquo; Advanced</a>', '', '', function(opts) {
});

});