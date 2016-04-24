riot = require('riot')
<marx-js-controls class='marx-{opts.settings.position}'>
  <link rel="stylesheet" href="build/stylesheets/base.css">
  <marx-js-open></marx-js-open>
  <script>
    this.standard = [
      { action: 'populate-whole-form', label: 'Populate Whole Form'    },
      { action: 'populate-textareas',  label: 'Populate TextAreas'     },
      { action: 'populate-inputs',     label: 'Populate Inputs'        },
      { action: 'populate-checkboxes', label: 'Populate Check Boxes'   },
      { action: 'populate-radios',     label: 'Populate Radio Buttons' },
      { action: 'populate-selects',    label: 'Populate Select Boxes'  }
    ]

    this.advanced = [
      { action: 'clear-form',      label: 'Clear Form'                    },
      { action: 'populate-submit', label: 'Populate and Submit'           },
      { action: 'show-hidden',     label: 'Show Hidden Fields'            },
      { action: 'expand-select',   label: 'Expand Select Boxes'           },
      { action: 'random-image',    label: 'Download Random Image'         },
      { action: 'generate-ipsum',  label: "Generate Ipsum", html: 'ipsum' }
    ]
  </script>

  <standard-controls>
    <control each="{ standard }">
      <a href="#{this.action}" class="{this.action}">Go</a>
      <p>{this.label}</p>
    </control>
    <toggle-advanced if={opts.toggle_advanced} />
  </standard-controls>

  <advanced-controls if={opts.advanced}>
    <control each="{ advanced }" settings={opts.settings}>
      <a href="#{this.action}" class="{this.action}">Go</a>
      <p>
        {this.label}
        <ipsum if={this.html} settings={opts.settings} />
      </p>
    </control>
  </advanced-controls>
</marx-js-controls>


<ipsum>
  <input type='number' value={opts.settings.ipsum} max={opts.settings.max_ipsum} />
  <span>Paragraphs</span>
</ipsum>

<toggle-advanced>
  <a onClick={marx.toggle_advanced} href='#advanced' class='marx-toggle-advanced'>&laquo; Advanced</a>
</toggle-advanced>