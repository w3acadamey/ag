const iframes = document.querySelectorAll('.iframe-container');
let currentIndex = 0;

function showIframe(index) {
    iframes.forEach((iframe, i) => {
        iframe.style.display = i === index ? 'block' : 'none';
    });
}

document.getElementById('navLeft').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + iframes.length) % iframes.length;
    showIframe(currentIndex);
});

document.getElementById('navRight').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % iframes.length;
    showIframe(currentIndex);
});

// Show the initial iframe
showIframe(currentIndex);

const sequence = ['blue', 'black', 'red'];
let userClicked = [];

document.querySelectorAll('.codeEditor_dot').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;   // ✅ FIX 1
        userClicked.push(color);

        if (userClicked.length > sequence.length) { // ✅ FIX 2
            userClicked = [];
        }

        if (userClicked.length === sequence.length) {
            let match = true;
            for (let i = 0; i < sequence.length; i++) {
                if (userClicked[i] !== sequence[i]) {
                    match = false;
                    break;
                }
            }

            document.querySelector('.chat-viewer').style.display =
                match ? 'block' : 'none';
        } else {
            document.querySelector('.chat-viewer').style.display = 'none';
        }
    });
});

document.getElementById('passButton').addEventListener('click', () => {
    userClicked = [];
    document.querySelector('.chat-viewer').style.display = 'none';
});

document.getElementById('clearButton').addEventListener('click', () => {
    userClicked = [];
    document.querySelector('.chat-viewer').style.display = 'none';
});

document.getElementById('closeButton').addEventListener('click', () => {
    const userConfirmed = confirm('Are you sure you want to log out?');
    if (userConfirmed) {
        iframes[currentIndex].querySelector('iframe').src =
            'https://w3acadamey.github.io/t/index.html'; // ✅ FIX 3
        userClicked = [];
        document.querySelector('.chat-viewer').style.display = 'none';
    }
});
