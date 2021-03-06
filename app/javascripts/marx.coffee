$             = require('jquery')
riot          = require('riot')
controls      = require('../views/marx-js-controls')
ipsum         = require('../views/marx-js-ipsum')
notifications = require('../views/marx-js-notifications')
simple        = require('../views/simple-open-controls')
advanced      = require('../views/advanced-open-controls')

styles = require('../stylesheets/base')
{ STANDARD_KEYS, ADVANCED_KEYS } = require('./constants')

class Marx
  settings:
    controls: 'standard'
    position: 'bottom-right'
    form: ""
    ipsum: 3
    max_ipsum: 10
    onload: false

  constructor: (options) ->
    this._url = "http://marxjs.com"
    $.getJSON "#{this._url}/characters", (data) =>
      @marx_json = data
      @initialize(options)

  initialize: (options) ->
    $.extend this.settings, options
    this.methods = this.method_by_keys()
    this.effected = this.default_counts()

    this.auto_populate() if this.settings.onload
    this.create_controls()

  create_controls: ->
    $('body').append """
      <marx-js-notifications></marx-js-notifications>
      <marx-js-controls></marx-js-controls>
    """
    control_opts =
      settings: this.settings,
      advanced: (['standard', 'minimum'].indexOf(this.settings.controls) is -1)
    if this.settings.controls is 'toggle-advanced'
      $.extend control_opts, {
        toggle_advanced: true
        func: this.toggle_advanced
      }

    riot.mount 'marx-js-controls', control_opts

    tags = riot.mount 'marx-js-notifications', { position: this.settings.position }
    this.notifications = tags[0]

    this.$el = $('marx-js-controls')

    open_template = if this.settings.controls is 'toggle-all'
    then 'advanced-open-controls'
    else 'simple-open-controls'

    if this.settings.controls is 'minimum'
      opts = {action: this.populate_whole_form}
    else
      opts = {action: this.handle_open_close_controls, controls: this.settings.controls}
      $.extend opts, {populate: this.populate_whole_form} if this.settings.controls is 'toggle-all'

    riot.mount 'marx-js-open', open_template, opts

    this.$('standard-controls control a').click (e) => @popluate_selected_fields(e)

    this.setup_control_listeners()

  setup_control_listeners: ->
    # using mouse to open controls
    this.$('advanced-controls').hide() if this.settings.controls is 'toggle-advanced'
    this.$('advanced-controls control a').click (e) => @advanced_actions(e)

    # open controls with keyboard
    document.addEventListener 'keypress', (e) =>
      char = String.fromCharCode(e.keyCode)

      @populate_whole_form() if e.shiftKey and char is '!'

      if @settings.controls isnt 'minimum'
        @open_controls() if e.shiftKey and char is "@"
        if @settings.controls is 'toggle-all' and $('advanced-controls').is(':visible')
          $('advanced-controls').hide()
        else if @settings.controls is 'advanced'
          @open_advanced_controls()

      if e.shiftKey and char is "#"
        if @settings.controls is 'toggle-advanced' and $('standard-controls').is(":visible")
          @open_advanced_controls()
        else if @settings.controls is 'toggle-all'
          @open_advanced_controls()
          $('standard-controls').hide()


  ###=========================
      POPULATE FORM METHODS
  =========================###
  auto_populate: ->
    onload = this.settings.onload
    if onload is true
      this.populate_whole_form()
    else
      $.each onload, (i, opt) =>
        @methods[opt]()

  populate_whole_form: (e) =>
    e?.preventDefault()
    @populate_inputs()
    @populate_textareas()
    @populate_checkboxes()
    @populate_radios()
    @populate_selects()
    false

  populate_inputs: =>
    @effected?.inputs = 0
    $.each $("#{@settings.form} input"), (i, input) =>
      unless $(input).val() isnt "" or $(input).hasClass 'no-populate'
        obj     = @get_random()
        brother = JSON.parse(obj.brother)
        movie   = JSON.parse(obj.movie)
        rand    = Math.random()
        year    = movie.year.toString()
        strings = [brother.name, movie.name, obj.first_name, obj.last_name, obj.description].filter () -> true
        value = switch $(input).attr('type')
          when 'number' then movie.year
          when 'email' then "#{brother.name.toLowerCase().replace(/\s/g, '')}@#{movie.name.toLowerCase().replace(/\s/g, '')}.com"
          when 'url' then "http://#{movie.name.toLowerCase().replace(/\s/g, '')}.com"
          when 'tel'
            Math.floor(Math.random() * 10000000000).toString()
          when 'date'
            "#{year}-0#{year.substr(Math.floor(rand*4), 1)}-2#{year.substr(Math.floor(rand*4), 1)}"
          else
            str = strings[Math.floor(Math.random() * strings.length)]
            if !str? or str is "" then "Marx" else str
        @show_password($(input), value) if $(input).attr('type') is 'password'

        if ['checkbox', 'radio', 'hidden'].indexOf $(input).attr('type') < 0
          $(input)
            .attr('data-marx-d', true)
            .val(value)
            .trigger('change')
            .trigger 'blur'
          @effected.inputs += 1

  show_password: ($input, password) ->
    $input.after "<p class='marx-password-note'>Password: #{password}</p>"

  populate_textareas: =>
    @effected.textareas = 0
    $.getJSON "#{@_url}/quotes", (data) =>
      $.each $("#{@settings.form} textarea"), (i, input) =>
        @effected.textareas += 1
        $(input)
          .attr('data-marx-d', true)
          .val(data[Math.floor(Math.random() * data.length)].body)
          .trigger('change').trigger('blur')

  populate_checkboxes: =>
    @effected.check_boxes = 0
    names = []
    $.each $("#{@settings.form} input[type=checkbox]"), (i, input) ->
      names.push $(input).attr('name') unless names.indexOf($(input).attr('name')) >= 0
    $.each names, (i, name) =>
      checked = if Math.floor(Math.random() * 2) is 1 then true else false
      clean_name = name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
      $("#{@settings.form} input[name=#{clean_name}]")
        .attr('data-marx-d', true)
        .attr('checked', checked)
        .trigger('change').trigger('blur')
      @effected.check_boxes += 1 if checked

  populate_radios: =>
    @effected.radio_buttons = 0
    names = []
    $("#{this.settings.form} input[type=radio]").each (i, input) -> names.push $(input).attr('name') unless names.indexOf($(input).attr('name')) >= 0
    $.each names, (i, name) =>
      clean_name = name.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
      total = $("#{@settings.form} input[name=#{clean_name}]").length
      $("#{@settings.form} input[name=#{name}]:eq(#{Math.floor(Math.random() * total)})")
        .attr('data-marx-d', true)
        .attr('checked', true)
        .trigger('change').trigger('blur')
      @effected.radio_buttons += 1

  populate_selects: =>
    @effected.selects = 0
    $("#{@settings.form} select").each (i, select) =>
      @effected.selects += 1
      total = $(select).attr('data-marx-d', true).find('option').length
      rand = Math.floor(Math.random() * total)
      $opt = $(select).find("option:eq(#{rand})")
      if $opt.attr('value')? and $opt.attr('value') isnt ""
        $opt.attr('selected', true)
      else
        $opt.next('option').attr('selected', true)
      $(select).trigger('change').trigger('blur')

  toggle_hidden_fields: =>
    @effected.hidden_fields = 0
    $("#{@settings.form} input[data-marx-hidden=true]").each (i, input) =>
      type = if $(input).attr('type') is 'hidden' then 'text' else 'hidden'
      $(input).attr('type', type)
      @effected.hidden_fields += 1

    $("#{@settings.form} input[type=hidden]").each (i, hidden) =>
      unless $(hidden).data('marx-d')?
        @effected.hidden_fields += 1
        $(hidden)
          .attr('type', 'text')
          .attr('data-marx-d', true)
          .attr('data-marx-hidden', true)

  trigger_notifications: ->
    this.notifications.alerts = []

    $.each this.effected, (key, val) =>
      unless val is 0
        el = key.replace(/_/, ' ')
        @notifications.alerts.push {count: val, element: el}
      @effected[key] = 0
    this.notifications.update()
    this.position_notifications()

  position_notifications: ->
    notification_bottom = ($('marx-js-controls').height() + 40) - $('marx-js-notifications').height()
    $('marx-js-notifications')
      .hide()
      .slideDown('fast')

    $('marx-js-notifications').css
      bottom: notification_bottom
      right: $('marx-js-controls').width()

    setTimeout =>
      $('notification').slideUp 'fast', =>
        @notifications.alerts = null
        @notifications.update()
    , 5000

  toggle_description: ($link) ->
    $parent = $link.parent('.marx-js-group')
    $span = $parent.find('p span')
    to = $span.data('text')
    from = $span.text()
    $span
      .text(to)
      .data('text', from)

  generate_ipsum: () =>
    $('body').append "<marx-js-ipsum></marx-js-ipsum>"
    riot.mount 'marx-js-ipsum',
      url: @_url
      position: @settings.position

  get_random: () -> @marx_json[Math.floor(Math.random() * @marx_json.length)]

  $: (el) -> this.$el.find(el)

  method_by_keys: ->
    {
      marx:       this
      inputs:     this.populate_inputs
      textareas:  this.populate_textareas
      checkboxes: this.populate_checkboxes
      radios:     this.populate_radios
      selects:    this.populate_selects
      # ipsum:      this.generate_ipsum
      # image:      this.get_random
    }

  default_counts: ->
    {
      inputs: 0
      texareas: 0
      selects: 0
      check_boxes: 0
      radio_buttons: 0
      hidden_fields: 0
    }

  toggle_standard_controls: (open=null, on_complete=null) ->
    if open is true
      this.$('standard-controls').slideDown 'fast', on_complete
    else if open is false
      this.$('standard-controls').slideUp 'fast', on_complete
    else
      open = not this.$('standard-controls').is(':visible')
      this.$('standard-controls').slideToggle 'fast', on_complete
    this.toggle_keybindings open, this.standard_key_bindings


  toggle_advanced_controls: (open=null, on_complete=null) =>
    if open is true
      @$('advanced-controls').slideDown 'fast', on_complete
    else if open is false
      @$('advanced-controls').slideUp 'fast', on_complete
    else
      open = not @$('advanced-controls').is(':visible')
      @$('advanced-controls').slideToggle 'fast', on_complete
    this.toggle_keybindings open, this.advanced_key_bindings

  advanced_link_text: ->
    $link = $('a.marx-toggle-advanced')
    txt = if $link.hasClass('opened') then "&laquo; Advanced" else "Close &raquo;"
    $link
      .toggleClass('opened')
      .html(txt)

  toggle_keybindings: (keybind, func) ->
    if keybind
      document.addEventListener 'keypress', func
    else
      document.removeEventListener 'keypress', func

  ###=====================
           EVENTS
  =====================###
  standard_key_bindings: (e) ->
    char = String.fromCharCode(e.keyCode)
    if STANDARD_KEYS[char]?
     $(".#{STANDARD_KEYS[char]}").trigger 'click'
     # document.querySelector("a.#{trigger}").click()

  advanced_key_bindings: (e) ->
    char = String.fromCharCode(e.keyCode)
    if ADVANCED_KEYS[char]?
     $(".#{ADVANCED_KEYS[char]}").trigger 'click'
     # document.querySelector("a.#{trigger}").click()


  popluate_selected_fields: (e) ->
    fn = switch $(e.target).attr('class')
      when 'populate-textareas'
        this.populate_textareas
      when 'populate-inputs'
        this.populate_inputs
      when 'populate-checkboxes'
        this.populate_checkboxes
      when 'populate-radios'
        this.populate_radios
      when 'populate-selects'
        this.populate_selects
      else
        this.populate_whole_form

    $.when(fn()).then =>
      @trigger_notifications()

    false

  advanced_actions: (e) ->
    switch $(e.target).attr('class')
      when 'clear-form'
        $('input[data-marx-d=true], textarea[data-marx-d=true]').val ""
        $('input[type=checkbox], input[type=radio]').each (i, cb) -> $(cb).removeAttr('checked') if $(cb).data('marx-d')? is $(cb).data('marx-d') and true
        $('select[data-marx-d=true] option:eq(0)').attr('selected', true)
      when 'populate-submit'
        $.when(this.populate_whole_form()).then ->
          $(e.target).replaceWith "<span class='spinner'>Loading</span>"
          setTimeout () ->
            $('form').submit()
          , 500
      when 'show-hidden'
        this.toggle_description $(e.target)
        $.when(this.toggle_hidden_fields()).then => @trigger_notifications()
      when 'expand-select'
        this.toggle_description $(e.target)
        $('select').each (i, select) =>
          if $(select).attr('size')?
            $(select).removeAttr('size')
          else
            $(select).attr('size', $(select).find('option').length)
      when 'random-image'
        window.location = "#{this._url}/get-image"
      when 'generate-ipsum' then this.generate_ipsum()

    false


  toggle_advanced: (e) =>
    e.preventDefault()
    this.advanced_link_text()
    this.toggle_advanced_controls()
    false

  toggle_key_bindings: (bind) ->
    if bind
      document.addEventListener "keypress", this.trigger_action
    else
      document.removeEventListener 'keypress', this.trigger_action


  handle_open_close_controls: (e) =>
    e.preventDefault()
    is_standard = $(e.target).hasClass('standard-controls')

    switch @settings.controls
      when 'standard', 'toggle-advanced'
        @toggle_standard_controls()
        if $('advanced-controls').is(":visible")
          @advanced_link_text()
          @toggle_advanced_controls(false)
      when 'advanced'
        @toggle_standard_controls()
        @toggle_advanced_controls()
      when 'toggle-all'
        if is_standard
          if this.$('advanced-controls').is(':visible')
            @toggle_advanced_controls false, => @toggle_standard_controls(true)
          else
            @toggle_standard_controls()
        else
          if this.$('standard-controls').is(':visible')
            @toggle_standard_controls false, => @toggle_advanced_controls(true)
          else
            @toggle_advanced_controls()

module.exports = Marx