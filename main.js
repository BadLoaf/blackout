(function() {
  // if (window.hasRun) {
  //   return;
  // }
  // window.hasRun = true;

  function blackout() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.toString();

    if (selectedText !== '') {
      var span = document.createElement('span');
      span.textContent = selectedText;
      span.classList.add('blackout');
      range.deleteContents();
      range.insertNode(span);
    }
  }

  function removeBlackout() {
    var blackoutSpans = document.querySelectorAll("span.blackout");
    blackoutSpans.forEach(span => {
      span.addEventListener('click', () => {
        const text = span.textContent;

        // Create a new text node with the text
        const textNode = document.createTextNode(text);

        // Replace the span with the text node
        span.parentNode.replaceChild(textNode, span);
      });
    });
  }

  function style() {
    var styleElement = document.createElement('style');
    styleElement.classList.add('blackout')
    var currentTextColor = window.getComputedStyle(document.body).color;
    styleElement.textContent = '.blackout { background-color: ' + currentTextColor + '; color: ' + currentTextColor + '; cursor: pointer}' + '.word { padding-left: 0.25em; padding-right: 0.25em;}';

    document.head.appendChild(styleElement);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command == "start") {
      window.addEventListener('mouseup', blackout);
      style();
    } else {
      window.removeEventListener('mouseup', blackout);
      removeBlackout();
    }
  })
})();

