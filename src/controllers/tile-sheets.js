/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store.js';
import { fetchAll, fetchTileSheets, fetchTileSheet,
  selectTileSheet, fetchTileSheetImage,
  madeTiles
  } from '../actions/tile-sheets.js';
import { processTiles } from '../tilesheet-processor.js';

export default function TileSheetsController() {
  /*store.dispatch(fetchTileSheets('/data/tile-sheets.json'))
    .then(() => {
      store
        .getState()
        .tileSheets
        .get('items')
        .toSeq()
        .forEach((tileSheet, src) => {
          store.dispatch(fetchTileSheet(src))
            .then((foo) => {
              const imageSrc = store
                .getState()
                .tileSheets.getIn(['items', src, 'src']);

              store.dispatch(fetchTileSheetImage(src, imageSrc))
                .then((result) => {
                  const image = store
                    .getState()
                    .tileSheets.getIn(['items', src, 'image']);
                  const tiles = store
                    .getState()
                    .tileSheets.getIn(['items', src, 'tiles']);

                  const tileImages = processTiles(image, tiles);
                  return store.dispatch(madeTiles(src, tileImages));
                }, () => {
                  console.log('error fetching tile sheet image');
                  return 'error';
                });
            }, () => {
              console.log('error fetching tile sheet');
              return 'error';
            });
        });
    });


  store.subscribe(() => {
    // for each tileSheet, once its tileSheetImage is loaded
    // we need to process the image
  });*/

  store.dispatch(fetchAll('/data/tile-sheets.json'));
}