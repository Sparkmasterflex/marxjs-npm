riot = require('riot')
<simple-open-controls>
  <a onClick={this.activate_controls} href='#open-controls' class='open-controls'>Marx.js</a>

  <script type="coffee">
    this.activate_controls = (e) ->
      if opts.controls is "minimum"
        marx.populate_whole_form()
      else
        console.log('hello?');
        $('standard-controls').slideToggle 'fast'
        if opts.controls is 'advanced'
          $('advanced-controls').slideToggle 'fast'
      false
  </script>
</simple-open-controls>