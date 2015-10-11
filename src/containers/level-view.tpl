<script id="levelView" type="text/ractive">
  <h2>{{ description }}</h2>
  <h3>Layers</h3>
  <!--<LayerSelect store="{{ store }}" state="{{ state }}"></LayerSelect>-->
  <LayerSelect layers="{{ state.layers }}"></LayerSelect>
  <Layers store="{{ store }}"></Layers>
  <h3>Tools</h3>
  <ToolSelect store="{{ store }}"></ToolSelect>
  <h3>Tiles</h3>
  <TileSheetSelect store="{{ store }}"></TileSheetSelect>
  <TileSelect store="{{ store }}"></TileSelect>
</script>

