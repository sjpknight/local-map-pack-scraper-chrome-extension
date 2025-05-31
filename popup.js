
document.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scan-members');
  const copyButton = document.getElementById('copy-all');
  const resultsBox = document.getElementById('results');
  const statusBox = document.getElementById('status');
  let leads = [];

  scanButton.addEventListener('click', () => {
    statusBox.textContent = '';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return alert("No active tab found.");

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "extractionResult") {
      leads = message.data;
      if (leads.length === 0) {
        resultsBox.value = "No listings found.";
        copyButton.disabled = true;
        return;
      }
      let output = "Business Name\tWebsite\tPhone Number\n";
      output += leads.map(lead => `${lead.name}\t${lead.website}\t${lead.phone}`).join("\n");
      resultsBox.value = output;
      copyButton.disabled = false;
    }
  });

  copyButton.addEventListener('click', () => {
    resultsBox.select();
    document.execCommand('copy');
    statusBox.textContent = '✅ Copied to clipboard!';
  });
});
