<script id="layers" type="text/ractive">
  {{#layers:i}}
    <Layer layer="{{ layers[i] }}" tileImages="{{ tileImages }}" width="{{ width }}" toolId="{{ toolId }}"></Layer>
  {{/layers}}
</script>

