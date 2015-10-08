<script id="layer" type="text/ractive">
  <div>{{ fps }}</div>
  <canvas 
  on-mousedown="mouseDown"
  on-mousemove="mouseMove" 
  on-mouseup="mouseUp" 
  width="400" height="400"></canvas>
</script>
