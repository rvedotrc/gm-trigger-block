// ==UserScript==
// @name        gm-trigger-block
// @namespace   http://rve.org.uk/greasemonkey
// @include     *
// @version     1
// ==/UserScript==

try {
  var bigBox;
  var closeBigBox = function(event) {
      bigBox.parentNode.removeChild(bigBox);
      event.stopPropagation();
  };

  var censor = function() {
    bigBox = document.createElement("div");
    bigBox.setAttribute("style", "border: 10px solid red; top: 1em; bottom: 1em; left: 1em; right: 1em; position: absolute; background: grey; z-index:999; text-align: center");
    var button = document.createElement("button");
    bigBox.appendChild(button);
    var t = document.createTextNode("Warning: trigger content found.  Click to reveal.");
    button.appendChild(t);
    button.addEventListener("click", closeBigBox);
    document.body.insertBefore(bigBox, document.body.firstChild);
  };

  var hasWord = function(word) {
    // Xpath - double up the quote
    var xpathWord = "'" + word.replace(/'/g, "''") + "'";

    // text somewhere outside of form
    if (document.evaluate("//*[contains(text(), "+word+")]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
        return true;
    }

    // form input
    if (document.evaluate("//input[@value = "+word+"]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
        return true;
    }

    return false;
  };

  var word = "can't";

  if (hasWord(word)) {
       censor();
       //break;
    }

} catch(e) {
  console.log("Error: "+e);
}
