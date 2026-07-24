(function () {
  var location = window.location;
  var path = encodeURIComponent(location.pathname + location.search);
  location.replace("/?p=" + path + location.hash);
})();
