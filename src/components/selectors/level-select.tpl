<script id="levelSelect" type="text/ractive">
  <ul>
  {{#levels:name}}
    <li>
      {{#isFetching}}
      ...
      {{/isFetching}}

      {{^isFetching}}
        {{#isError}}
        Error!!
        {{/isError}}

        {{^isError}}
        <button on-click="select:{{ name }}">
          <img class="thumbnail" src="/img/{{ thumbnail }}">{{ description }}
        </button>
        {{/isError}}
      {{/isFetching}}
    </li>
  {{/levels}}
  </ul>
</script>
