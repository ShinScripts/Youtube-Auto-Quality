const select = document.getElementById('quality');

chrome.storage.sync.get('quality', (data) => {
    if (data.quality) {
        select.value = data.quality;
    }
});

select.addEventListener('change', () => {
    chrome.storage.sync.set({ quality: select.value }, () => {
        console.log('Quality saved:', select.value);
    });
});