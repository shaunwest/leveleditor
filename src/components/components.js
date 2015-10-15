
import Ractive from 'ractive';

import Layers from './layers/layers.js';
import Layer from './layers/layer.js';

import TileSheetSelect from './selectors/tile-sheet-select.js';
import TileSelect from './selectors/tile-select.js';
import ToolSelect from './selectors/tool-select.js';
import LayerSelect from './selectors/layer-select.js';
import LevelSelect from './selectors/level-select.js';

Ractive.components = {
  Layers,
  Layer,
  TileSheetSelect,
  TileSelect,
  ToolSelect,
  LayerSelect,
  LevelSelect
};
