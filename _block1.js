
/* three.js still ships its UMD bundle but logs an informational "deprecated with r150+"
   notice on load. Silence only that single line so the console stays clean; the UMD
   build itself is fully functional and is what makes file:// loading work. */
(function () {
  var w = console.warn;
  console.warn = function (m) {
    if (typeof m === 'string' && m.indexOf('are deprecated with r150+') !== -1) return;
    return w.apply(console, arguments);
  };
})();
