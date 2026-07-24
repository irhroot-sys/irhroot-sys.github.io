(function () {
  var path = new URLSearchParams(window.location.search).get("p");
  if (!path) return;
  window.history.replaceState(null, "", decodeURIComponent(path) + window.location.hash);
})();
