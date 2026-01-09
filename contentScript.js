(function () {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);

    function UpdateInjectedQuality() {
        chrome.storage.sync.get('quality', (data) => {
            const quality = data.quality || 'hd1080';
            window.dispatchEvent(new CustomEvent('UpdateQuality', { detail: quality }));
        });
    }

    chrome.storage.onChanged.addListener(UpdateInjectedQuality);
    window.addEventListener('InjectionReady', UpdateInjectedQuality);
})();