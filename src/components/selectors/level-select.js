/**
 * Created by shaunwest on 8/22/15.
 */

import React from 'react';

class LevelSelect extends React.Component {
  render() {
    return (
      <button onClick={ e => this.props.onLevelSelect('kitty-world') }>
        <img className="thumbnail" src="/img/default-thumbnail.png" /> { this.props.description }
      </button>
    );
  }
}

export default LevelSelect;



/*
import Ractive from 'ractive';

const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  data: function () {
    return {
      levels: {} // replace with Map, use adaptor (?)
    };
  }
});

export default LevelSelect;*/


