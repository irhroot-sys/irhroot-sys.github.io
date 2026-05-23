(function () {
  var p = new URLSearchParams(window.location.search).get("p");
  if (!p) return;
  var target = decodeURIComponent(p) + window.location.hash;
  window.history.replaceState(null, "", target);
})();
