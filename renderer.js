let isPlaying = false;
let scrollSpeed = 1;
let isReversed = false;
let isMirrored = false;
let scrollInterval;

const teleprompter = document.getElementById('teleprompter');

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

// IPC handlers for keyboard shortcuts will be registered by the main process