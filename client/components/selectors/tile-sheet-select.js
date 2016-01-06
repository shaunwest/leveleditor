/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { DATA_PATH } from '../../paths.js';

export default class TileSheetSelect extends Component {
  render() {
    const tileSheets = this.props.tileSheets;
    return (
      <ul>
      {
        tileSheets
          .map((tileSheet, key) => {
            const thumbnail = DATA_PATH + 'assets/' + tileSheet.get('thumbnail');
            if (tileSheet.get('isFetching')) {
              return (<li key={ key }>...</li>);
            }
            if (tileSheet.get('isError')) {
              return (<li key={ key }>Error!</li>);
            }
            return (
              <li key={ key }>
                <input
                  type="radio"
                  onChange={ e => this.props.onTileSheetSelect(key) }
                  checked={ key === this.props.selectedTileSheetId }
                /> <img src={ thumbnail } />{ tileSheet.get('description') }
              </li>
            );
          })
          .valueSeq()
      }
      </ul>
    );
  }
}
