<script id="tileSelect" type="text/ractive">
  {{#isFetching}}
  ...
  {{/isFetching}}
  {{^isFetching}}
    {{#tileImages:i}}
        <img src="{{ tiles[0] }}" on-click="select:{{ i }}">
    {{/tileImages}}
  {{/isFetching}}
  <ul>
  </ul>
</script>

