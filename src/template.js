/**
 * Created by shaunwest on 8/19/15.
 */

import 'isomorphic-fetch';

export default function (url) {
  return fetch(url)
    .then(response => response.text());
}

