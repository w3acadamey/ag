/***********************
 * SLIDER LOGIC
 ***********************/
const iframes = document.querySelectorAll('.iframe-container');
let currentIndex = 0;

function showIframe(index) {
    iframes.forEach((iframe, i) => {
        iframe.style.display = i === index ? 'block' : 'none';
    });
}

// Navigation buttons
document.getElementById('navLeft')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + iframes.length) % iframes.length;
    showIframe(currentIndex);
});

document.getElementById('navRight')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % iframes.length;
    showIframe(currentIndex);
});

// Show first iframe initially
showIframe(currentIndex);

/***********************
 * UNLOCK LOGIC
 * (JS-only, HTML unchanged)
 ***********************/
const sequence = ['blue', 'black', 'red'];
let userClicked = [];

// RGB → color name mapping (because colors are inline styles)
const colorMap = {
    'rgb(255, 0, 0)': 'red',
    'rgb(255, 255, 0)': 'yellow',
    'rgb(0, 128, 0)': 'green',
    'rgb(0, 0, 255)': 'blue',
    'rgb(0, 0, 0)': 'black'
};

// Store dot clicks ONLY
document.querySelectorAll('.codeEditor_dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const bgColor = getComputedStyle(dot).backgroundColor;
        const color = colorMap[bgColor];

        if (!color) return;

        userClicked.push(color);

        // Safety: reset if user clicks more than required
        if (userClicked.length > sequence.length) {
            userClicked = [];
        }
    });
});

/***********************
 * GO BUTTON (→ arrow)
 * Unlock happens ONLY here
 ***********************/
const goButton = document.querySelector('.pass-btn .fa-arrow-right')?.parentElement;

goButton?.addEventListener('click', () => {
    const isMatch =
        userClicked.length === sequence.length &&
        sequence.every((c, i) => c === userClicked[i]);

    document.querySelector('.chat-viewer').style.display =
        isMatch ? 'block' : 'none';
});

/***********************
 * RESET / CLOSE
 ***********************/
document.getElementById('passButton')?.addEventListener('click', () => {
    userClicked = [];
    document.querySelector('.chat-viewer').style.display = 'none';
});

document.getElementById('clearButton')?.addEventListener('click', () => {
    userClicked = [];
    document.querySelector('.chat-viewer').style.display = 'none';
});

document.getElementById('closeButton')?.addEventListener('click', () => {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
        iframes[currentIndex].src = 'https://w3acadamey.github.io/t/index.html';
        userClicked = [];
        document.querySelector('.chat-viewer').style.display = 'none';
    }
});
