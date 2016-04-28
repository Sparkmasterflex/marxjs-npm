riot = require('riot')
<simple-open-controls>
  <a onClick={this.activate_controls} href='#open-controls' class='open-controls'>Marx.js</a>

  <script type="coffee">
    this.activate_controls = (e) ->
      if opts.controls is "minimum"
        marx.populate_whole_form()
      else
        marx.open_controls()
      false
  </script>
</simple-open-controls>