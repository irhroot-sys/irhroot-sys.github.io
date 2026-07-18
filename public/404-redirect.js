(function () {
  var l = window.location;
  var path = encodeURIComponent(l.pathname + l.search);
  l.replace("/?p=" + path + l.hash);
})();
