(function () {
  function hasAccessibleName(el) {
    if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return true;
    if (!el.id) return false;
    return !!document.querySelector('label[for="' + el.id + '"]');
  }

  function applyLabels() {
    var controls = document.querySelectorAll("input, select, textarea");
    controls.forEach(function (el) {
      if (hasAccessibleName(el)) return;
      var fallback = el.getAttribute("placeholder") || el.getAttribute("name") || el.id || "Input field";
      el.setAttribute("aria-label", fallback);
    });
  }

  var mo = new MutationObserver(applyLabels);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  applyLabels();
})();
