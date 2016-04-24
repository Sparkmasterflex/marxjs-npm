$ = require('jquery')
riot = require('riot')
<advanced-open-controls>
  <div class='open-controls-group'>
    <a onClick={marx.populate_whole_form} href="#populate-whole-form" class="quick-populate" title="Populate Whole Form">Marx.js</a>
    <a onClick={this.open_standard} href="#standard-controls" class="standard-controls" title="Show Standard Controls">Standard Controls</a>
    <a onClick={this.open_advanced} href="#advanced-controls" class="advanced-controls" title="Show Advanced Controls">Advanced Controls</a>
  </div>


  <script type="coffeescript">
    this.open_standard = (e) ->
      $('advanced-controls').slideUp 'fast', ->
        $('standard-controls').slideToggle 'fast'
      false

    this.open_advanced = (e) ->
      $('standard-controls').slideUp 'fast', ->
        $('advanced-controls').slideToggle 'fast'

      false
  </script>
</advanced-open-controls>