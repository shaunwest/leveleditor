/* created by shaun 9/26/2015 */

import store from './store.js';

export function getCurrentTileSheet() {
  const tileSheetState = store.getState().tileSheets;
  const tileSheets = tileSheetState.get('items');
  const tileSheetId = tileSheetState.get('currentTileSheetId');

  if (!tileSheets.size || !tileSheetId) {
    return;
  }

  const tileSheet = tileSheets.get(tileSheetId);
  if (!tileSheet.size) {
    return;
  }

  return tileSheet;
}

export function getCurrentLevelId() {
  return store.getState().levels.get('currentLevelId');
}

export function getCurrentLevel() {
  const levels = store.getState().levels;
  const currentLevelId = levels.get('currentLevelId');
  return levels.get('items').get(currentLevelId);
}
