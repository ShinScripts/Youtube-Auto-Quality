(function () {
    const QUALITY_MAP = {
        highres: "4320p",
        hd2880: "2880p",
        hd2160: "2160p",
        hd1440: "1440p",
        hd1080: "1080p",
        hd720: "720p",
        large: "480p",
        medium: "360p",
        small: "240p",
        tiny: "144p",
    };
    let targetQuality = "hd1080";
    let currentVideoId = null;

    window.addEventListener('UpdateQuality', (e) => {
        targetQuality = e.detail;
        if (currentVideoId) {
            SetVideoQuality();
        } else {
            HandleNewVideoLoad();
        }
    });

    function GetPlayer() {
        const player = document.getElementById('movie_player');
        return (player && typeof player.getPlaybackQuality === 'function') ? player : null;
    }

    function VerifyQuality(target, player, attempts = 0) {
        const current = player.getPlaybackQuality();

        if (current === target || current === 'highres') {
            console.log(`YouTube Auto Quality: Verified! Quality is ${QUALITY_MAP[current] || current}.`);
            return;
        }

        if (attempts < 10) {
            setTimeout(() => VerifyQuality(target, player, attempts + 1), 500);
        } else {
            console.log(`YouTube Auto Quality: Verification timed out. Current quality: ${QUALITY_MAP[current] || current}.`);
        }
    }

    function SetVideoQuality() {
        const player = GetPlayer();

        if (!player) {
            console.log("YouTube Auto Quality: Player object not ready.");
            return;
        }

        const available = player.getAvailableQualityLevels();
        if (!available || available.length === 0) {
            setTimeout(SetVideoQuality, 500);
            return;
        }

        const current = player.getPlaybackQuality();
        const bestOption = available.includes(targetQuality) ? targetQuality : available[0]; // youtube sorts from best to worst

        if (current === "unknown" || !current) {
            setTimeout(SetVideoQuality, 500);
            return;
        }

        if (current === bestOption) {
            console.log(`YouTube Auto Quality: Already at desired/best available quality: ${QUALITY_MAP[current] || current}.`);
            return;
        }

        console.log(`YouTube Auto Quality: Switching ${QUALITY_MAP[current] || current} -> ${QUALITY_MAP[bestOption] || bestOption}`);

        player.setPlaybackQualityRange(bestOption, bestOption);
        player.setPlaybackQuality(bestOption);

        VerifyQuality(bestOption, player);
    }

    function HandleNewVideoLoad() {
        const urlParams = new URLSearchParams(window.location.search);
        const newVideoId = urlParams.get('v');

        if (window.location.href.includes('/watch?v=') && newVideoId && newVideoId !== currentVideoId) {
            console.log(`YouTube Auto Quality: Detected navigation to new video ${newVideoId}. Resetting state.`);
            currentVideoId = newVideoId;
            setTimeout(SetVideoQuality, 700);
        }
        else if (!window.location.href.includes('/watch?v=') && currentVideoId) {
            console.info(`YouTube Auto Quality: Detected navigation to home page. Resetting state.`);
            currentVideoId = null;
        }
    }

    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            HandleNewVideoLoad();
        }
    });

    observer.observe(document, { subtree: true, childList: true });
    window.dispatchEvent(new CustomEvent('InjectionReady'));
})();