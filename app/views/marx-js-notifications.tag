riot = require('riot')

<marx-js-notifications class='marx-{opts.position}'>
  <notification if={this.alerts} each={this.alerts}>
    {this.count} {this.element} elements were altered
  </notification>
</marx-js-notifications>