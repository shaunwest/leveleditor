<script id="tileSheetSelect" type="text/ractive">
  <ul>
  {{#tileSheets:name}}
    <li>
      {{#isFetching}}
      ...
      {{/isFetching}}

      {{^isFetching}}
        {{#isError}}
        Error!!
        {{/isError}}

        {{^isError}}
        <button on-click="select">
          <img src="/data/assets/{{ thumbnail }}">{{ description }}
        </button>
        {{/isError}}
      {{/isFetching}}
    </li>
  {{/tileSheets}}
  </ul>
</script>

