/*
 Use phantomjs to load a given URL, inject scrapedown bookmarklet and
 console.log out the generated markdown.
*/

// Based on https://github.com/ariya/phantomjs/blob/master/examples/injectme.js
if (typeof(phantom) !== "undefined") {

  var page = require('webpage').create(),
    system = require('system'),
    address;

  if (system.args.length === 1) {
    console.log('Usage: phantom.js <some URL>');
    phantom.exit();
  }

  address = system.args[1];
  page.open(address, function(status) {

    page.injectJs("phantom.js");

    setTimeout(function() {
      var html = page.evaluate(function() {
        return document.getElementById('inputPane').value;
      });

      console.log(html);
      phantom.exit();
    }, 1000);

  });
} else {

  // This whole file gets injected into the page
  // But this is what gets executed. ie the bookmarklet
  // Bookmarklet from: http://psd.github.io/scrapedown/

  (function(){var location="http://psd.github.com/scrapedown/";var nocache="";scrapedown_location=location;var css=document.createElement("link");css.rel="stylesheet";css.href=location+"scrapedown.css"+nocache;css.media="all";css.type="text/css";document.getElementsByTagName("head")[0].appendChild(css);var js=document.createElement("script");js.src=location+"scrapedown.js"+nocache;document.body.appendChild(js)})();
}
