// listen for messages asking to fetch RSS feed
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "fetchRSS") {
    fetch(message.url)
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        if (response.status !== 200)
          throw new Error(response.status + " response");

        return response.text();
      })
      .then((text) => {
        sendResponse({ ok: true, data: text });
      })
      .catch((err) => {
        console.error("fetching rss failed:", err);
        sendResponse({ ok: false, error: err.message });
      });
    return true;
  }
});
