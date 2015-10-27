/**
 * Created by shaunwest on 9/7/15.
 */


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAll as fetchAllLevels } from '../modules/levels/levels-fetch.js';
import { navigateTo } from '../modules/routes/routes-handle.js';

import LevelSelect from '../components/selectors/level-select.js';

class LevelSelectView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllLevels('/data/levels.json'));
  }
 
  render() {
    const { dispatch, levels } = this.props;
    return (
      <LevelSelect onLevelSelect={ levelId => dispatch(navigateTo('/level/' + levelId)) } levels={ levels.get('items') } />
    );
  }
}

function select(state) {
  return { levels: state.get('levels') };
}

export default connect(select)(LevelSelectView);
