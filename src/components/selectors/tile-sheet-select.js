/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';

export default class TileSheetSelect extends Component {
  render() {
    const tileSheets = this.props.tileSheets;
    return (
      <ul>
      {
        tileSheets
          .map((tileSheet, key) => {
            const thumbnail = '/data/assets/' + tileSheet.get('thumbnail');
            if (tileSheet.get('isFetching')) {
              return (<li key={ key }>...</li>);
            }
            if (tileSheet.get('isError')) {
              return (<li key={ key }>Error!</li>);
            }
            return (
              <li key={ key }>
                <button onClick={ e => this.props.onTileSheetSelect(key) }>
                  <img src={ thumbnail } />{ tileSheet.get('description') }
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
