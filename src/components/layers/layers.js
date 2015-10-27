/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import Layer from './layer.js';

export default class Layers extends Component {
  render() {
    const layers = this.props.layers;

    return (
      <ul className="layersContainer">
      {
        layers
          .map((layer) => {
            return (
              <li key={ layer.get('id') }>
                <Layer layer={ layer } tileImages={ this.props.tileImages } width={ this.props.width } height={ this.props.height } toolId={ this.props.toolId } onToolAction={ this.props.onToolAction }></Layer>
              </li>
            );
          })
          .valueSeq()
      }
      </ul>
    );
  } 
}
/*
import Ractive from 'ractive';

export default Ractive.extend({
  template: '#layers',
  data: function () {
    return {
      tileImages: [],
      layers: [],
      width: 400,
      toolId: null
    };
  }
});
*/
