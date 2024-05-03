function listenForClicks() {
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    if (e.target.id == "start") {
      browser.tabs.query({ active: true, currentWindow: true }).then(start);
    } else {
      browser.tabs.query({ active: true, currentWindow: true }).then(end);
    }


    function start(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "start",
      });
    }
    function end(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "end",
      });
    }
  })
}

browser.tabs.executeScript({ file: "./main.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

function reportExecuteScriptError(error) {
  // document.querySelector("#popup-content").classList.add("hidden");
  // document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}
