/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component, PropTypes } from 'react';

// TODO: fetching?

export default class LevelSelect extends Component {
  render() {
    const levels = this.props.levels;

    return (
      <ul>
      {
        levels
          .map((level, levelId) => {
            const thumbnail = '/img/' + level.get('thumbnail');

            return (
              <li key={ levelId }>
                <button onClick={ e => this.props.onLevelSelect(levelId) }>
                  <img className="thumbnail" src={ thumbnail } /> { level.get('description') }
                </button>
              </li>
            );
          })
          .valueSeq()
      }
      </ul>
    );
  }
}

LevelSelect.propTypes = { levels: PropTypes.object };
LevelSelect.defaultProps = { levels: {} };
