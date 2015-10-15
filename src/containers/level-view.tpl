<script id="levelView" type="text/ractive">
  <h2>{{ description }}</h2>
  <h3>Layers</h3>
  <LayerSelect layers="{{ state.layers.items }}"></LayerSelect>
  <Layers toolId="{{ state.tools.selectedId }}" layers="{{ state.layers.items }}" tileImages="{{ state.currentTileSet.tileImages }}"></Layers>
  <h3>Tools</h3>
  <ToolSelect></ToolSelect>
  <h3>Tiles</h3>
  <TileSheetSelect tileSheets="{{ state.tileSheets.items }}"></TileSheetSelect>
  <TileSelect tileImages="{{ state.currentTileSet.tileImages }}"></TileSelect>
</script>

