let isPlaying = false;
let scrollSpeed = 1;
let isReversed = false;
let isMirrored = false;
let scrollInterval;
let fontSize = 48; // Initial font size

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        startScroll();
    } else {
        stopScroll();
    }
}

function startScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
        const direction = isReversed ? -1 : 1;
        teleprompter.scrollTop += scrollSpeed * direction;
    }, 50);
}

function stopScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

function toggleReverse() {
    isReversed = !isReversed;
    if (isPlaying) {
        stopScroll();
        startScroll();
    }
}

function adjustSpeed(delta) {
    scrollSpeed = Math.max(0.2, Math.min(10, scrollSpeed + delta));
    if (isPlaying) {
        stopScroll();
        startScroll();
    }
}

function toggleMirror() {
    isMirrored = !isMirrored;
    teleprompter.style.transform = isMirrored ? 'scaleX(-1)' : 'scaleX(1)';
}

function adjustFontSize(delta) {
    fontSize = Math.max(12, Math.min(96, fontSize + delta));
    teleprompter.style.fontSize = `${fontSize}px`;
}

ipcRenderer.on('toggle-play', () => togglePlay());
ipcRenderer.on('toggle-reverse', () => toggleReverse());
ipcRenderer.on('adjust-speed', (_, delta) => adjustSpeed(delta));
ipcRenderer.on('toggle-mirror', () => toggleMirror());
ipcRenderer.on('adjust-font-size', (_, delta) => adjustFontSize(delta));