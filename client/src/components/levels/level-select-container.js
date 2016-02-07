/**
 * Created by shaunwest on 9/7/15.
 */

import React, { Component, PropTypes } from 'react';
import { DATA_PATH } from '../../paths.js';
import { connect } from 'react-redux';
import { fetchAll as fetchAllLevels } from '../../actions/levels.js';
import { navigateTo } from '../../actions/routes.js';

import LevelSelect from './level-select.js';

class LevelSelectContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllLevels(DATA_PATH + 'levels.json'));
  }
 
  render() {
    const { dispatch, levels } = this.props;
    return (
      <LevelSelect onLevelSelect={ levelId => dispatch(navigateTo('/level/' + levelId)) } levels={ levels } />
    );
  }
}

function select(state) {
  return { levels: state.get('levels') };
}

export default connect(select)(LevelSelectContainer);
