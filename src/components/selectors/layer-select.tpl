<script id="layerSelect" type="text/ractive">
  <ul>
  {{#layers:i}}
    <li><input type="checkbox" on-click="toggle:{{ i }}"><button on-click="select:{{ i }}">{{ layers[i].label }}</button></li>
  {{/layers}}
  </ul>
</script>
