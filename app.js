const door = document.getElementById('door');

door.addEventListener('click', () => {
    door.style.display = 'none';
});

const emptyDoor = document.getElementById('empty-door');

emptyDoor.addEventListener('click', () => {
    zoomInDoor();
});

let isAnimating = false;

function zoomInDoor() {
    isWindowAnimating = true;

    // Start zoom-in animation on the positioned container
    emptyDoor.classList.add('zoom-in');

    // After the zoom completes, change background and hide elements
    const onTransitionEnd = (e) => {
        // Only act on the transform transition to avoid duplicate calls
        
        // remove listeners from all three targets
        emptyDoor.removeEventListener('transitionend', onTransitionEnd);

        // Opens new window location
        bootScreen.style.display = "block";
        setTimeout(typeText, 500);
        window.location.href = "/portfolio.html";

        // allow future transitions
        isAnimating = false;
    };

  emptyDoor.addEventListener('transitionend', onTransitionEnd);
}

const bootScreen = document.getElementById("boot-screen");
let bootText = bootScreen.innerHTML;
bootScreen.innerHTML = "";

let charIndex = 0;
const typeSpeed = 10;

function typeText() {
    if (charIndex < bootText.length) {
        bootScreen.innerHTML += bootText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typeSpeed);
    } else {
        //const boot = new Audio("sfx/boot.mp3");
        setTimeout(() => {
            bootScreen.classList.add("fade-out");
            //boot.play();
            setTimeout(() => {
                window.location.href = "/portfolio.html";
            }, 1500);
        }, 1000);
    }
}

