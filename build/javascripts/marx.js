var $, Marx, advanced, controls, ipsum, notifications, riot, simple,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = require('jquery');

riot = require('riot');

controls = require('../views/marx-js-controls.js');

ipsum = require('../views/marx-js-ipsum.js');

notifications = require('../views/marx-js-notifications.js');

simple = require('../views/simple-open-controls.js');

advanced = require('../views/advanced-open-controls.js');

Marx = (function() {
  Marx.prototype.settings = {
    controls: 'standard',
    position: 'bottom-right',
    form: "",
    ipsum: 3,
    max_ipsum: 10,
    onload: false
  };

  function Marx(options) {
    this.toggle_advanced = bind(this.toggle_advanced, this);
    this.populate_whole_form = bind(this.populate_whole_form, this);
    this._url = "http://marxjs.com";
    $.getJSON(this._url + "/characters", (function(_this) {
      return function(data) {
        _this.marx_json = data;
        return _this.initialize(options);
      };
    })(this));
  }

  Marx.prototype.initialize = function(options) {
    $.extend(this.settings, options);
    this.methods = this.method_by_keys();
    this.effected = this.default_counts();
    if (this.settings.onload) {
      this.auto_populate();
    }
    return this.create_controls();
  };

  Marx.prototype.create_controls = function() {
    var open_template, tags;
    $('body').append("<marx-js-notifications></marx-js-notifications>\n<marx-js-controls></marx-js-controls>");
    riot.mount('marx-js-controls', {
      settings: this.settings,
      advanced: ['standard', 'minimum'].indexOf(this.settings.controls) === -1,
      toggle_advanced: this.settings.controls === 'toggle-advanced'
    });
    tags = riot.mount('marx-js-notifications', {
      position: this.settings.position
    });
    this.notifications = tags[0];
    this.$el = $('marx-js-controls');
    open_template = this.settings.controls === 'toggle-all' ? 'advanced-open-controls' : 'simple-open-controls';
    riot.mount('marx-js-open', open_template, {
      controls: this.settings.controls
    });
    this.$('standard-controls control a').click((function(_this) {
      return function(e) {
        return _this.popluate_selected_fields(e);
      };
    })(this));
    if (this.settings.controls === 'toggle-advanced') {
      this.set_toggle_advanced();
    }
    return this.$('advanced-controls control a').click((function(_this) {
      return function(e) {
        return _this.advanced_actions(e);
      };
    })(this));
  };

  Marx.prototype.set_toggle_advanced = function() {
    return this.$('advanced-controls').hide();
  };


  /*=========================
      POPULATE FORM METHODS
  =========================
   */

  Marx.prototype.auto_populate = function() {
    var onload;
    onload = this.settings.onload;
    if (onload === true) {
      return this.populate_whole_form();
    } else {
      return $.each(onload, (function(_this) {
        return function(i, opt) {
          return _this.methods[opt]();
        };
      })(this));
    }
  };

  Marx.prototype.populate_whole_form = function(e) {
    this.populate_inputs();
    this.populate_textareas();
    this.populate_checkboxes();
    this.populate_radios();
    this.populate_selects();
    return false;
  };

  Marx.prototype.populate_inputs = function() {
    var marx, ref;
    marx = this.marx || this;
    if ((ref = marx.effected) != null) {
      ref.inputs = 0;
    }
    return $.each($(marx.settings.form + " input"), (function(_this) {
      return function(i, input) {
        var brother, movie, obj, rand, str, strings, value, year;
        if (!($(input).val() !== "" || $(input).hasClass('no-populate'))) {
          obj = marx.get_random();
          brother = JSON.parse(obj.brother);
          movie = JSON.parse(obj.movie);
          rand = Math.random();
          year = movie.year.toString();
          strings = [brother.name, movie.name, obj.first_name, obj.last_name, obj.description].filter(function() {
            return true;
          });
          value = (function() {
            switch ($(input).attr('type')) {
              case 'number':
                return movie.year;
              case 'email':
                return (brother.name.toLowerCase().replace(/\s/g, '')) + "@" + (movie.name.toLowerCase().replace(/\s/g, '')) + ".com";
              case 'url':
                return "http://" + (movie.name.toLowerCase().replace(/\s/g, '')) + ".com";
              case 'tel':
                return Math.floor(Math.random() * 10000000000).toString();
              case 'date':
                return year + "-0" + (year.substr(Math.floor(rand * 4), 1)) + "-2" + (year.substr(Math.floor(rand * 4), 1));
              default:
                str = strings[Math.floor(Math.random() * strings.length)];
                if ((str == null) || str === "") {
                  return "Marx";
                } else {
                  return str;
                }
            }
          })();
          if ($(input).attr('type') === 'password') {
            marx.show_password($(input), value);
          }
          if (['checkbox', 'radio', 'hidden'].indexOf($(input).attr('type') < 0)) {
            $(input).attr('data-marx-d', true).val(value).trigger('change').trigger('blur');
            return marx.effected.inputs += 1;
          }
        }
      };
    })(this));
  };

  Marx.prototype.show_password = function($input, password) {
    return $input.after("<p class='marx-password-note'>Password: " + password + "</p>");
  };

  Marx.prototype.populate_textareas = function() {
    var marx;
    marx = this.marx || this;
    marx.effected.textareas = 0;
    return $.getJSON(marx._url + "/quotes", (function(_this) {
      return function(data) {
        return $.each($(marx.settings.form + " textarea"), function(i, input) {
          marx.effected.textareas += 1;
          return $(input).attr('data-marx-d', true).val(data[Math.floor(Math.random() * data.length)].body).trigger('change').trigger('blur');
        });
      };
    })(this));
  };

  Marx.prototype.populate_checkboxes = function() {
    var marx, names;
    marx = this.marx || this;
    marx.effected.check_boxes = 0;
    names = [];
    $.each($(marx.settings.form + " input[type=checkbox]"), function(i, input) {
      if (!(names.indexOf($(input).attr('name')) >= 0)) {
        return names.push($(input).attr('name'));
      }
    });
    return $.each(names, (function(_this) {
      return function(i, name) {
        var checked, clean_name;
        checked = Math.floor(Math.random() * 2) === 1 ? true : false;
        clean_name = name.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        $(marx.settings.form + " input[name=" + clean_name + "]").attr('data-marx-d', true).attr('checked', checked).trigger('change').trigger('blur');
        if (checked) {
          return marx.effected.check_boxes += 1;
        }
      };
    })(this));
  };

  Marx.prototype.populate_radios = function() {
    var marx, names;
    marx = this.marx || this;
    marx.effected.radio_buttons = 0;
    names = [];
    $(marx.settings.form + " input[type=radio]").each(function(i, input) {
      if (!(names.indexOf($(input).attr('name')) >= 0)) {
        return names.push($(input).attr('name'));
      }
    });
    return $.each(names, (function(_this) {
      return function(i, name) {
        var clean_name, total;
        clean_name = name.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        total = $(marx.settings.form + " input[name=" + clean_name + "]").length;
        $(marx.settings.form + " input[name=" + name + "]:eq(" + (Math.floor(Math.random() * total)) + ")").attr('data-marx-d', true).attr('checked', true).trigger('change').trigger('blur');
        return marx.effected.radio_buttons += 1;
      };
    })(this));
  };

  Marx.prototype.populate_selects = function() {
    var marx;
    marx = this.marx || this;
    marx.effected.selects = 0;
    return $(marx.settings.form + " select").each((function(_this) {
      return function(i, select) {
        var $opt, rand, total;
        marx.effected.selects += 1;
        total = $(select).attr('data-marx-d', true).find('option').length;
        rand = Math.floor(Math.random() * total);
        $opt = $(select).find("option:eq(" + rand + ")");
        if (($opt.attr('value') != null) && $opt.attr('value') !== "") {
          $opt.attr('selected', true);
        } else {
          $opt.next('option').attr('selected', true);
        }
        return $(select).trigger('change').trigger('blur');
      };
    })(this));
  };

  Marx.prototype.toggle_hidden_fields = function() {
    this.effected.hidden_fields = 0;
    $(this.settings.form + " input[data-marx-hidden=true]").each((function(_this) {
      return function(i, input) {
        var type;
        type = $(input).attr('type') === 'hidden' ? 'text' : 'hidden';
        $(input).attr('type', type);
        return _this.effected.hidden_fields += 1;
      };
    })(this));
    return $(this.settings.form + " input[type=hidden]").each((function(_this) {
      return function(i, hidden) {
        if ($(hidden).data('marx-d') == null) {
          _this.effected.hidden_fields += 1;
          return $(hidden).attr('type', 'text').attr('data-marx-d', true).attr('data-marx-hidden', true);
        }
      };
    })(this));
  };

  Marx.prototype.trigger_notifications = function() {
    this.notifications.alerts = [];
    $.each(this.effected, (function(_this) {
      return function(key, val) {
        var el;
        if (val !== 0) {
          el = key.replace(/_/, ' ');
          _this.notifications.alerts.push({
            count: val,
            element: el
          });
        }
        return _this.effected[key] = 0;
      };
    })(this));
    this.notifications.update();
    return this.position_notifications();
  };

  Marx.prototype.position_notifications = function() {
    var notification_bottom;
    notification_bottom = ($('marx-js-controls').height() + 40) - $('marx-js-notifications').height();
    $('marx-js-notifications').hide().slideDown('fast');
    $('marx-js-notifications').css({
      bottom: notification_bottom,
      right: $('marx-js-controls').width()
    });
    return setTimeout((function(_this) {
      return function() {
        return $('notification').slideUp('fast', function() {
          _this.notifications.alerts = null;
          return _this.notifications.update();
        });
      };
    })(this), 5000);
  };

  Marx.prototype.toggle_description = function($link) {
    var $parent, $span, from, to;
    $parent = $link.parent('.marx-js-group');
    $span = $parent.find('p span');
    to = $span.data('text');
    from = $span.text();
    return $span.text(to).data('text', from);
  };

  Marx.prototype.generate_ipsum = function() {
    var marx;
    marx = this.marx || this;
    $('body').append("<marx-js-ipsum></marx-js-ipsum>");
    return riot.mount('marx-js-ipsum', {
      url: marx._url,
      position: this.settings.position
    });
  };

  Marx.prototype.get_random = function() {
    return this.marx_json[Math.floor(Math.random() * this.marx_json.length)];
  };

  Marx.prototype.$ = function(el) {
    return this.$el.find(el);
  };

  Marx.prototype.method_by_keys = function() {
    return {
      marx: this,
      inputs: this.populate_inputs,
      textareas: this.populate_textareas,
      checkboxes: this.populate_checkboxes,
      radios: this.populate_radios,
      selects: this.populate_selects
    };
  };

  Marx.prototype.default_counts = function() {
    return {
      inputs: 0,
      texareas: 0,
      selects: 0,
      check_boxes: 0,
      radio_buttons: 0,
      hidden_fields: 0
    };
  };


  /*=====================
           EVENTS
  =====================
   */

  Marx.prototype.popluate_selected_fields = function(e) {
    var fn;
    fn = (function() {
      switch ($(e.target).attr('class')) {
        case 'populate-textareas':
          return this.populate_textareas;
        case 'populate-inputs':
          return this.populate_inputs;
        case 'populate-checkboxes':
          return this.populate_checkboxes;
        case 'populate-radios':
          return this.populate_radios;
        case 'populate-selects':
          return this.populate_selects;
        default:
          return this.populate_whole_form;
      }
    }).call(this);
    $.when(fn()).then((function(_this) {
      return function() {
        return _this.trigger_notifications();
      };
    })(this));
    return false;
  };

  Marx.prototype.advanced_actions = function(e) {
    switch ($(e.target).attr('class')) {
      case 'clear-form':
        $('input[data-marx-d=true], textarea[data-marx-d=true]').val("");
        $('input[type=checkbox], input[type=radio]').each(function(i, cb) {
          if (($(cb).data('marx-d') != null) === $(cb).data('marx-d') && true) {
            return $(cb).removeAttr('checked');
          }
        });
        $('select[data-marx-d=true] option:eq(0)').attr('selected', true);
        break;
      case 'populate-submit':
        $.when(this.populate_whole_form()).then(function() {
          $(e.target).replaceWith("<span class='spinner'>Loading</span>");
          return setTimeout(function() {
            return $('form').submit();
          }, 500);
        });
        break;
      case 'show-hidden':
        this.toggle_description($(e.target));
        $.when(this.toggle_hidden_fields()).then((function(_this) {
          return function() {
            return _this.trigger_notifications();
          };
        })(this));
        break;
      case 'expand-select':
        this.toggle_description($(e.target));
        $('select').each((function(_this) {
          return function(i, select) {
            if ($(select).attr('size') != null) {
              return $(select).removeAttr('size');
            } else {
              return $(select).attr('size', $(select).find('option').length);
            }
          };
        })(this));
        break;
      case 'random-image':
        window.location = this._url + "/get-image";
        break;
      case 'generate-ipsum':
        this.generate_ipsum();
    }
    return false;
  };

  Marx.prototype.toggle_advanced = function(e) {
    var $link, txt;
    $link = $(e.target);
    txt = $link.hasClass('opened') ? "&laquo; Advanced" : "Close &raquo;";
    $link.toggleClass('opened').html(txt);
    this.$('advanced-controls').toggle();
    return false;
  };

  return Marx;

})();

module.exports = Marx;
