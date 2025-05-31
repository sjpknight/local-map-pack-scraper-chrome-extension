
(() => {
  const output = [];

  const possibleBlocks = document.querySelectorAll('div[jscontroller][data-async-context], div[role="region"], div[jsaction]');
  possibleBlocks.forEach(block => {
    const nameEl = block.querySelector('div[role="heading"], div.BTtC6e, div[aria-level="3"]');
    const websiteEl = block.querySelector('a[href^="http"]');
    const name = nameEl ? nameEl.innerText.trim() : '';
    const website = websiteEl ? websiteEl.href : '';

    let phone = '';
    if (block.innerText) {
      const phoneMatch = block.innerText.match(/\+?\d[\d\s\-()]{6,}/);
      if (phoneMatch) phone = phoneMatch[0].trim();
    }

    if (name && phone) {
      output.push({ name, website, phone });
    }
  });

  chrome.runtime.sendMessage({ action: "extractionResult", data: output });
})();
