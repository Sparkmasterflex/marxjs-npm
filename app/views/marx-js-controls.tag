riot = require('riot')
<marx-js-controls  class='marx-{opts.settings.position}'>
  <marx-js-open></marx-js-open>
  <script>
    this.standard = [
      { action: 'populate-whole-form', label: 'Populate Whole Form',    key: '#1' },
      { action: 'populate-textareas',  label: 'Populate TextAreas',     key: '#2' },
      { action: 'populate-inputs',     label: 'Populate Inputs',        key: '#3' },
      { action: 'populate-checkboxes', label: 'Populate Check Boxes',   key: '#4' },
      { action: 'populate-radios',     label: 'Populate Radio Buttons', key: '#5' },
      { action: 'populate-selects',    label: 'Populate Select Boxes',  key: '#6' }
    ]

    this.advanced = [
      { action: 'clear-form',      label: 'Clear Form',            key: '#7'   },
      { action: 'populate-submit', label: 'Populate and Submit',   key: '#8'   },
      { action: 'show-hidden',     label: 'Show Hidden Fields',    key: '#9'   },
      { action: 'expand-select',   label: 'Expand Select Boxes',   key: '#0'   },
      { action: 'random-image',    label: 'Download Random Image', key: '$' }
    ]
  </script>

  <standard-controls>
    <control each="{ standard }">
      <p>{this.label}</p>
      <p class='marx-js-trigger'>
        <a href="#{this.action}" class="{this.action}">Go</a>
        <span>or {key}</span>
      </p>
    </control>
    <toggle-advanced if={opts.toggle_advanced}>
      <a onClick={opts.func} href='#advanced' class='marx-toggle-advanced'>&laquo; Advanced</a>
    </toggle-advanced>
  </standard-controls>

  <advanced-controls if={opts.advanced}>
    <control each="{ advanced }" settings={opts.settings}>
      <p>
        {this.label}
        <ipsum if={this.html} settings={opts.settings} />
      </p>
      <p class='marx-js-trigger'>
        <a href="#{this.action}" class="{this.action}">Go</a>
        <span>or {key}</span>
      </p>
    </control>

    <control settings={opts.settings}>
      <p>
        Generate Ipsum
        <ipsum>
          <input type='number' value={opts.settings.ipsum} max={opts.settings.max_ipsum} />
          <span>Paragraphs</span>
        </ipsum>
      </p>
      <p class='marx-js-trigger'>
        <a href="#generate-ipsum" class="generate-ipsum">Go</a>
        <span>or %</span>
      </p>
    </control>
  </advanced-controls>
</marx-js-controls>
