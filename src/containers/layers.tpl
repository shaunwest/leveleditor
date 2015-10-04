<script id="layers" type="text/ractive">
  {{#layers:i}}
    <Layer layer="{{ layers[i] }}" tileImages="{{ tileImages }}" width="{{ width }}"></Layer>
  {{/layers}}
</script>

