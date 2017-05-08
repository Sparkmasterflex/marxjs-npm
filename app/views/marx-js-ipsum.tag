riot = require('riot')
$ = require('jquery')

<marx-js-ipsum class='marx-{opts.position}'>
  <h4>Marx Ipsum</h4>
  <a onClick={this.close_ipsum} href='#close' class='marx-ipsum-close'>X</a>
  <div class='marx-container'>
    <spinner if={!this.ipsums}></spinner>
    <ipsum-para if={this.ipsums} each={this.ipsums}>
      {this.body}
    </ipsum-para>
  </div>

  <script type='coffee'>
    num = parseInt $('advanced-controls ipsum input').val()
    $.getJSON "#{opts.url}/monologues", (data) =>
      max = if num > data.length then data.length-1 else num
      ipsums = data.sort () -> 0.5 - Math.random()
      this.ipsums = ipsums[0..max-1]
      this.update()

    this.close_ipsum = (e) ->
      e?.preventDefault()
      $('marx-js-ipsum').slideUp 'fast'
      false
  </script>
</marx-js-ipsum>