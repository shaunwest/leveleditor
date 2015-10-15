<script id="layers" type="text/ractive">
  <div class="layersContainer">
  {{#layers:i}}
    <Layer layer="{{ layers[i] }}" tileImages="{{ tileImages }}" width="{{ width }}" toolId="{{ toolId }}"></Layer>
  {{/layers}}
  </div>
</script>

