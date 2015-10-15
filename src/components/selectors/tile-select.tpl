<script id="tileSelect" type="text/ractive">
  {{#isFetching}}
  ...
  {{/isFetching}}
  {{^isFetching}}
  <ul>
    {{#tileImageUrls:i}}
    <li><img src="{{ tiles[0] }}" on-click="select:{{ i }}"></li>
    {{/tileImageUrls}}
  </ul>
  {{/isFetching}}
  <ul>
  </ul>
</script>

