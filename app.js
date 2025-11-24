// Clean, single-file implementation for zoom + bootscreen typewriter
const door = document.getElementById('door');
const emptyDoor = document.getElementById('empty-door');
const bootScreen = document.getElementById('boot-screen');
const bootTextEl = document.getElementById('boot-text');

let isAnimating = false;

if (door) {
    door.addEventListener('click', () => {
        door.style.display = 'none';
    });
}

if (emptyDoor) {
    emptyDoor.addEventListener('click', () => {
        zoomInDoor();
    });
}

function zoomInDoor() {
    if (isAnimating) return;
    isAnimating = true;

    document.body.classList.add('no-scroll');
    emptyDoor.classList.add('zoom-in');

    const onTransitionEnd = (e) => {
        if (e.propertyName && e.propertyName !== 'transform') return;
        emptyDoor.removeEventListener('transitionend', onTransitionEnd);
        if (bootScreen) startBootSequence();
        isAnimating = false;
    };

    emptyDoor.addEventListener('transitionend', onTransitionEnd);
}

const bootText = `Nishka's Hub v1.0

Booting up...
Doing stuff...
Memory Test... OK
Made with ♡ by Nishka Kanchan

Loading system files...
SYSTEM.DAT........OK
COMMAND.COM.......OK

Initializing GUI...`;

let _typing = false;

function startBootSequence() {
    if (!bootScreen || !bootTextEl) {
        setTimeout(() => window.location.href = './portfolio.html', 700);
        return;
    }

    bootScreen.classList.add('visible');
    bootTextEl.textContent = '';
    _typing = true;
    let idx = 0;

    function typeNext() {
        if (idx >= bootText.length) {
            _typing = false;
            setTimeout(() => {
                bootScreen.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = './portfolio.html';
                }, 900);
            }, 700);
            return;
        }

        const ch = bootText.charAt(idx);
        bootTextEl.textContent += ch;
        idx++;

        let delay = 22;
        if (ch === '\n') delay = 120;
        if (ch === '.' || ch === ',') delay = 60;
        if (ch === ' ') delay = 12;

        setTimeout(typeNext, delay);
    }

    typeNext();
}

