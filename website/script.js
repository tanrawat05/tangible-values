// Shared centre — calculated once, used by ALL coins identically
const coinX = (window.innerWidth / 2) - 250;
const coinY = (window.innerHeight / 2) - 250;

gsap.set("#main-coin", {
    position: "fixed",
    top: 0,
    left: 0,
    width: 500,
    height: 500,
    xPercent: 0,
    yPercent: 0,
    x: coinX,
    y: coinY,
    scale: 0.8,
    zIndex: 5,
});

const coinTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        endTrigger: ".legacy-section",
        end: "top center",
        scrub: 1,
    }
});

// Animate the scale but keep it centered
coinTl.to("#main-coin", {
    scale: 1,
    duration: 1,
    ease: "power2.inOut"
});


// ─── 2. BRITISH INDIA COIN ────────────────────────────────────────────────────
const britishCoin = document.getElementById("british-coin");

gsap.set(britishCoin, {
    visibility: "visible",
    opacity: 1,
    position: "fixed",
    top: 0, left: 0,
    width: 500, height: 500,
    zIndex: 6,
    x: coinX,
    y: window.innerHeight + 200
});

gsap.to(britishCoin, {
    y: coinY,
    ease: "none",
    scrollTrigger: {
        trigger: ".legacy-section",
        start: "center center",
        end: "bottom+=600 bottom",
        scrub: 3,
    }
});


// ─── 3. INDIA 1947 COIN ───────────────────────────────────────────────────────
const indiaCoin = document.getElementById("india-coin");

gsap.set(indiaCoin, {
    visibility: "visible",
    opacity: 1,
    position: "fixed",
    top: 0, left: 0,
    width: 500, height: 500,
    zIndex: 8,
    x: coinX,
    y: window.innerHeight + 200
});

gsap.to(indiaCoin, {
    y: coinY,
    ease: "none",
    scrollTrigger: {
        trigger: ".british-section",
        start: "center center",
        end: "bottom+=600 bottom",
        scrub: 3,
    }
});


// ─── 4. RUPEE COIN ────────────────────────────────────────────────────────────
const rupeeCoin = document.getElementById("rupee-coin");

gsap.set(rupeeCoin, {
    visibility: "visible",
    opacity: 1,
    position: "fixed",
    top: 0, left: 0,
    width: 500, height: 500,
    zIndex: 9,
    x: coinX,
    y: window.innerHeight + 200
});

gsap.to(rupeeCoin, {
    y: coinY,
    ease: "none",
    scrollTrigger: {
        trigger: ".india-section",
        start: "center center",
        end: "bottom+=600 bottom",
        scrub: 3,
    }
});


// ─── HIDE ALL COINS when scrolling past rupee section ────────────────────────
ScrollTrigger.create({
    trigger: ".rupee-section",
    start: "bottom center",
    onEnter: () => {
        gsap.to([britishCoin, indiaCoin, rupeeCoin], {
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
        });
        gsap.to("#main-coin", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
        });
    },
    onLeaveBack: () => {
        gsap.to([britishCoin, indiaCoin, rupeeCoin], {
            opacity: 1,
            duration: 0.5
        });
        gsap.to("#main-coin", {
            opacity: 1,
            duration: 0.5
        });
    }
});


// ─── LEGACY TEXT: fade out ────────────────────────────────────────────────────
gsap.to(".legacy-left, .legacy-right", {
    opacity: 0,
    y: -80,
    ease: "power2.in",
    scrollTrigger: {
        trigger: ".legacy-section",
        start: "bottom-=300 bottom",
        end: "bottom bottom",
        scrub: 1,
    }
});


// ─── BRITISH SECTION: fade in + fade out ─────────────────────────────────────
gsap.set(".british-section", { opacity: 0 });
gsap.set(".british-left, .british-right", { opacity: 0, y: 60 });
gsap.set("#audio-player-british", { opacity: 0, y: 30 });

ScrollTrigger.create({
    trigger: ".british-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
        const p = self.progress;
        const fadeIn = Math.min(p / 0.25, 1);
        const fadeOut = p > 0.55 ? 1 - ((p - 0.55) / 0.25) : 1;
        const opacity = Math.max(fadeIn * fadeOut, 0);
        const yVal = 60 * (1 - fadeIn);
        gsap.set(".british-section", { opacity });
        gsap.set(".british-left, .british-right", { opacity, y: yVal });
        gsap.set("#audio-player-british", { opacity, y: yVal / 2 });
    }
});


// ─── INDIA SECTION: fade in + fade out ───────────────────────────────────────
gsap.set(".india-section", { opacity: 0 });
gsap.set(".india-left, .india-right", { opacity: 0, y: 60 });
gsap.set("#audio-player-india", { opacity: 0, y: 30 });

ScrollTrigger.create({
    trigger: ".india-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
        const p = self.progress;
        const fadeIn = Math.min(p / 0.25, 1);
        const fadeOut = p > 0.55 ? 1 - ((p - 0.55) / 0.25) : 1;
        const opacity = Math.max(fadeIn * fadeOut, 0);
        const yVal = 60 * (1 - fadeIn);
        gsap.set(".india-section", { opacity });
        gsap.set(".india-left, .india-right", { opacity, y: yVal });
        gsap.set("#audio-player-india", { opacity, y: yVal / 2 });
    }
});


// ─── RUPEE SECTION: fade in ───────────────────────────────────────────────────
gsap.set(".rupee-section", { opacity: 0 });
gsap.set(".rupee-left, .rupee-right", { opacity: 0, y: 60 });
gsap.set("#audio-player-rupee", { opacity: 0, y: 30 });

ScrollTrigger.create({
    trigger: ".rupee-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
        const p = self.progress;
        const fadeIn = Math.min(p / 0.3, 1);
        const opacity = fadeIn;
        const yVal = 60 * (1 - fadeIn);
        gsap.set(".rupee-section", { opacity });
        gsap.set(".rupee-left, .rupee-right", { opacity, y: yVal });
        gsap.set("#audio-player-rupee", { opacity, y: yVal / 2 });
    }
});


// ─── CIRCULATION SECTION: fade in ────────────────────────────────────────────
gsap.set(".circulation-section", { opacity: 0 });

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top 80%",
    end: "top 10%",
    scrub: 1,
    onUpdate: (self) => {
        gsap.set(".circulation-section", { opacity: self.progress });
    }
});

// ─── CIRCULATION AUDIO: fade in with first note ───────────────────────────────
const circulationAudio = document.querySelector('.circulation-audio');

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=400 top",
    onEnter: () => {
        gsap.to(circulationAudio, {
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(circulationAudio, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.4
        });
    }
});

// ─── AUDIO: CIRCULATION ───────────────────────────────────────────────────────
const audio5 = document.getElementById('coin-clink-audio-5');
const playBtn5 = document.getElementById('play-pause-5');
const progressBar5 = document.getElementById('progress-5');
const disc5 = document.getElementById('disc-5');
let animationId5;

function updateSmoothProgress5() {
    if (!audio5.paused && audio5.duration) {
        const percentage = (audio5.currentTime / audio5.duration) * 100;
        progressBar5.style.width = percentage + "%";
        animationId5 = requestAnimationFrame(updateSmoothProgress5);
    }
}

playBtn5.addEventListener('click', () => {
    if (audio5.paused) {
        audio5.play();
        playBtn5.innerText = "⏸";
        disc5.classList.add('is-playing');
        animationId5 = requestAnimationFrame(updateSmoothProgress5);
    } else {
        audio5.pause();
        playBtn5.innerText = "▶";
        disc5.classList.remove('is-playing');
        cancelAnimationFrame(animationId5);
    }
});

audio5.addEventListener('ended', () => {
    playBtn5.innerText = "▶";
    progressBar5.style.width = "0%";
    disc5.classList.remove('is-playing');
});

// ─── NOTE: slides up and overlaps CIRCULATION text ───────────────────────────
const noteContainer = document.getElementById("note-container");
const noteLabel = document.getElementById("note-label");
const pointerLine = document.querySelector(".note-pointer-line");

gsap.set(noteContainer, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    y: window.innerHeight + 200,
    zIndex: 103
});

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top bottom",
    end: "top+=500 top",
    scrub: 2,
    onUpdate: (self) => {
        const p = self.progress;
        const startY = window.innerHeight + 200;
        const endY = window.innerHeight * 0.25;
        const currentY = startY + (endY - startY) * p;
        gsap.set(noteContainer, { y: currentY });
    },
    onLeave: () => {
        document.querySelector('.circulation-section').classList.add('bg-visible');
        gsap.to(noteLabel, { opacity: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(pointerLine, { width: 80, duration: 0.8, ease: "power2.out", delay: 0.3 });
    },
    onEnterBack: () => {
        document.querySelector('.circulation-section').classList.remove('bg-visible');
        gsap.to(noteLabel, { opacity: 0, duration: 0.2 });
        gsap.to(pointerLine, { width: 0, duration: 0.2 });
    }
});

// ─── NOTE 2: slides up and stacks on first note ───────────────────────────────
const noteContainer2 = document.getElementById("note-container-2");
const noteLabel2 = document.getElementById("note-label-2");
const pointerLine2 = document.querySelector(".note-pointer-line-2");

gsap.set(noteContainer2, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    y: window.innerHeight + 400,   // ← starts further below viewport
    zIndex: 104
});

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=1200 bottom",   // ← starts very late, well after first note label shows
    end: "top+=1600 top",
    scrub: 2,
    onUpdate: (self) => {
        const p = self.progress;
        const startY = window.innerHeight + 200;
        const endY = window.innerHeight * 0.25;
        const currentY = startY + (endY - startY) * p;
        gsap.set(noteContainer2, { y: currentY });
    },
    onLeave: () => {
        gsap.to(noteLabel, { opacity: 0, duration: 0.4, ease: "power2.in" });
        gsap.to(pointerLine, { width: 0, duration: 0.3 });
        gsap.to(noteLabel2, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 });
        gsap.to(pointerLine2, { width: 100, duration: 0.8, ease: "power2.out", delay: 0.5 });
    },
    onEnterBack: () => {
        gsap.to(noteLabel2, { opacity: 0, duration: 0.2 });
        gsap.to(pointerLine2, { width: 0, duration: 0.2 });
        gsap.to(noteLabel, { opacity: 1, duration: 0.4 });
        gsap.to(pointerLine, { width: 80, duration: 0.4 });
    }
});

// ─── NOTE 3: 100 Rupee 1969 ───────────────────────────────────────────────────
const noteContainer3 = document.getElementById("note-container-3");
const noteLabel3 = document.getElementById("note-label-3");
const pointerLine3 = document.querySelector(".note-pointer-line-3");

gsap.set(noteContainer3, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    y: window.innerHeight + 400,
    zIndex: 105
});

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=2000 bottom",
    end: "top+=2400 top",
    scrub: 2,
    onUpdate: (self) => {
        const p = self.progress;
        const startY = window.innerHeight + 400;
        const endY = window.innerHeight * 0.25;
        const currentY = startY + (endY - startY) * p;
        gsap.set(noteContainer3, { y: currentY });
    },
    onLeave: () => {
        gsap.to(noteLabel2, { opacity: 0, duration: 0.4, ease: "power2.in" });
        gsap.to(pointerLine2, { width: 0, duration: 0.3 });
        gsap.to(noteLabel3, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 });
        gsap.to(pointerLine3, { width: 60, duration: 0.8, ease: "power2.out", delay: 0.5 });
    },
    onEnterBack: () => {
        gsap.to(noteLabel3, { opacity: 0, duration: 0.2 });
        gsap.to(pointerLine3, { width: 0, duration: 0.2 });
        gsap.to(noteLabel2, { opacity: 1, duration: 0.4 });
        gsap.to(pointerLine2, { width: 60, duration: 0.4 });
    }
});

// ─── NOTE 4: 500 Rupee 2016 ───────────────────────────────────────────────────
const noteContainer4 = document.getElementById("note-container-4");
const noteLabel4 = document.getElementById("note-label-4");
const pointerLine4 = document.querySelector(".note-pointer-line-4");

gsap.set(noteContainer4, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    y: window.innerHeight + 400,
    zIndex: 106
});

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=2800 bottom",
    end: "top+=3200 top",
    scrub: 2,
    onUpdate: (self) => {
        const p = self.progress;
        const startY = window.innerHeight + 400;
        const endY = window.innerHeight * 0.30;
        const currentY = startY + (endY - startY) * p;
        gsap.set(noteContainer4, { y: currentY });
    },
    onLeave: () => {
        gsap.to(noteLabel3, { opacity: 0, duration: 0.4, ease: "power2.in" });
        gsap.to(pointerLine3, { width: 0, duration: 0.3 });
        gsap.to(noteLabel4, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 });
        gsap.to(pointerLine4, { width: 80, duration: 0.8, ease: "power2.out", delay: 0.5 });
    },
    onEnterBack: () => {
        gsap.to(noteLabel4, { opacity: 0, duration: 0.2 });
        gsap.to(pointerLine4, { width: 0, duration: 0.2 });
        gsap.to(noteLabel3, { opacity: 1, duration: 0.4 });
        gsap.to(pointerLine3, { width: 60, duration: 0.4 });
    }
});

// ─── COLLAPSE TRANSITION ──────────────────────────────────────────────────────
const collapseTitle = document.getElementById("collapse-title");
const noteLeftHalf = document.getElementById("note-left-half");
const noteRightHalf = document.getElementById("note-right-half");
const circulationAudioCollapse = document.querySelector('.circulation-audio-collapse');
const circulationTitle = document.querySelector('.circulation-title');

// Match torn halves exactly to note 4's final rendered position
const noteWidth = window.innerWidth * 0.65;  // ← match currency-note-4 width (80%)
const noteStartX = (window.innerWidth - noteWidth) / 2;  // centred horizontally
const noteStartY = window.innerHeight * 0.35;  // ← match note 4's endY exactly

gsap.set(noteLeftHalf, {
    position: "fixed",
    top: 0,
    left: 0,
    width: noteWidth / 2,
    x: noteStartX,
    y: noteStartY,
    opacity: 0,
    visibility: "visible",
    zIndex: 107
});

gsap.set(noteRightHalf, {
    position: "fixed",
    top: 0,
    left: 0,
    width: (noteWidth / 2) * 0.90,   // ← reduce right half width directly
    x: noteStartX + (noteWidth / 2),
    y: noteStartY,
    opacity: 0,
    visibility: "visible",
    zIndex: 107
});

// ─── STEP 1: Breathing room — CIRCULATION fades, COLLAPSE appears ─────────────
ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=4500 bottom",   // ← much later, after 500rs note has had time to breathe
    end: "top+=4900 top",
    scrub: 1.5,
    onEnter: () => {
        // Fade out CIRCULATION title upward
        gsap.to(circulationTitle, {
            opacity: 0,
            y: -100,
            duration: 0.8,
            ease: "power2.in"
        });

        // Fade out all previous notes
        gsap.to([noteContainer, noteContainer2, noteContainer3], {
            opacity: 0,
            duration: 0.5
        });

        // Fade out all labels
        gsap.to([noteLabel, noteLabel2, noteLabel3, noteLabel4], {
            opacity: 0,
            duration: 0.3
        });

        // Swap audio players
        gsap.to(circulationAudio, {
            opacity: 0,
            visibility: "hidden",
            duration: 0.4
        });
        gsap.to(circulationAudioCollapse, {
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            delay: 0.5
        });

        // Fade COLLAPSE in from below
        gsap.fromTo(collapseTitle,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
    },
    onLeaveBack: () => {
        gsap.to(circulationTitle, { opacity: 1, y: 0, duration: 0.5 });
        gsap.to([noteContainer, noteContainer2, noteContainer3], { opacity: 1, duration: 0.4 });
        gsap.to(collapseTitle, { opacity: 0, y: 60, duration: 0.4 });
        gsap.to(circulationAudio, { opacity: 1, visibility: "visible", duration: 0.4 });
        gsap.to(circulationAudioCollapse, { opacity: 0, visibility: "hidden", duration: 0.3 });
        gsap.to([noteLabel, noteLabel2, noteLabel3, noteLabel4], { opacity: 1, duration: 0.3 });
    }
});

// ─── STEP 2: Note tears and separates ────────────────────────────────────────
ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=4900 bottom",
    end: "top+=5700 top",
    scrub: 2,
    onEnter: () => {
        // Hide intact note 4
        gsap.to(noteContainer4, { opacity: 0, duration: 0.2 });
        // Force show torn halves at starting position
        gsap.set(noteLeftHalf, {
            opacity: 1,
            x: noteStartX,
            y: noteStartY,
            rotation: 0
        });
        gsap.set(noteRightHalf, {
            opacity: 1,
            x: noteStartX + (noteWidth / 2),
            y: noteStartY,
            rotation: 0
        });
    },
    onLeaveBack: () => {
        gsap.to(noteContainer4, { opacity: 1, duration: 0.3 });
        gsap.set(noteLeftHalf, { opacity: 0 });
        gsap.set(noteRightHalf, { opacity: 0 });
    },
    onUpdate: (self) => {
        const p = self.progress;
        const eased = p * p;

        gsap.set(noteLeftHalf, {
            opacity: 1,
            x: noteStartX - (eased * window.innerWidth * 0.35),
            y: noteStartY + (eased * window.innerHeight * 0.1),
            rotation: -eased * 20,
        });

        gsap.set(noteRightHalf, {
            opacity: 1,
            x: noteStartX + (noteWidth / 2) + (eased * window.innerWidth * 0.3),
            y: noteStartY + (eased * window.innerHeight * 0.1),
            rotation: eased * 20,
        });
    }
});

// ─── DIGITAL SHIFT: zoom in from centre ──────────────────────────────────────
const digitalShiftTitle = document.getElementById("digital-shift-title");
const digitalAssets = document.getElementById("digital-assets");
const digitalItems = document.querySelectorAll(".digital-item");

ScrollTrigger.create({
    trigger: ".circulation-section",
    start: "top+=5700 bottom",
    end: "top+=6200 top",
    scrub: 1.5,
    onEnter: () => {
        // Swap COLLAPSE → DIGITAL SHIFT
        gsap.to(collapseTitle, { opacity: 0, y: -80, duration: 0.5, ease: "power2.in" });
        gsap.fromTo(digitalShiftTitle,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3 }
        );

        // Show digital assets container
        gsap.to(digitalAssets, { opacity: 1, duration: 0.3, delay: 0.3 });

        // Zoom each item in with slight stagger
        gsap.to("#digital-1", {
            scale: 1,
            rotation: -12,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.5
        });

        gsap.to("#digital-2", {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.4
        });

        gsap.to("#digital-3", {
            scale: 1,
            rotation: 12,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: 0.6
        });
    },
    onLeaveBack: () => {
        gsap.to(digitalShiftTitle, { opacity: 0, y: 40, duration: 0.4 });
        gsap.to(digitalAssets, { opacity: 0, duration: 0.3 });
        gsap.to("#digital-1", { scale: 0, rotation: -12, duration: 0.3 });
        gsap.to("#digital-2", { scale: 0, rotation: 0, duration: 0.3 });
        gsap.to("#digital-3", { scale: 0, rotation: 12, duration: 0.3 });
        gsap.to(collapseTitle, { opacity: 1, y: 0, duration: 0.4 });
    }
});

// ─── DIGITAL ITEMS: hover bounce + click sound ────────────────────────────────
document.getElementById("digital-assets").style.pointerEvents = "auto";

const applePayEl = document.getElementById("digital-1");
const paytmEl = document.getElementById("digital-2");
const debitCardEl = document.getElementById("digital-3");

const applePaySound = document.getElementById("apple-pay-sound");
const paytmSound = document.getElementById("paytm-sound");
const cardSound = document.getElementById("card-sound");

// ─── DIGITAL ITEMS: click sounds ─────────────────────────────────────────────
function playOnce(id) {
    const audioEl = document.getElementById(id);
    if (!audioEl) { console.error("Audio not found:", id); return; }
    audioEl.currentTime = 0;
    audioEl.play().catch(e => console.error("Play failed:", e));
}

applePayEl.addEventListener('click', () => playOnce("apple-pay-sound"));
paytmEl.addEventListener('click', () => playOnce("paytm-sound"));
debitCardEl.addEventListener('click', () => playOnce("card-sound"));

// Apple Pay — base rotation -12deg
applePayEl.addEventListener('mouseenter', () => {
    gsap.to(applePayEl, { scale: 1.12, rotation: -12, duration: 0.3, ease: "back.out(2)" });
});
applePayEl.addEventListener('mouseleave', () => {
    gsap.to(applePayEl, { scale: 1, rotation: -12, duration: 0.3, ease: "power2.out" });
});
applePayEl.addEventListener('click', () => playOnce(applePaySound));

// Paytm — base rotation 0deg
paytmEl.addEventListener('mouseenter', () => {
    gsap.to(paytmEl, { scale: 1.12, rotation: 0, duration: 0.3, ease: "back.out(2)" });
});
paytmEl.addEventListener('mouseleave', () => {
    gsap.to(paytmEl, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
});
paytmEl.addEventListener('click', () => playOnce(paytmSound));

// Debit Card — base rotation 12deg
debitCardEl.addEventListener('mouseenter', () => {
    gsap.to(debitCardEl, { scale: 1.12, rotation: 12, duration: 0.3, ease: "back.out(2)" });
});
debitCardEl.addEventListener('mouseleave', () => {
    gsap.to(debitCardEl, { scale: 1, rotation: 12, duration: 0.3, ease: "power2.out" });
});
debitCardEl.addEventListener('click', () => playOnce(cardSound));

// ─── AUDIO: COLLAPSE ─────────────────────────────────────────────────────────
const audio6 = document.getElementById('coin-clink-audio-6');
const playBtn6 = document.getElementById('play-pause-6');
const progressBar6 = document.getElementById('progress-6');
const disc6 = document.getElementById('disc-6');
let animationId6;

function updateSmoothProgress6() {
    if (!audio6.paused && audio6.duration) {
        const percentage = (audio6.currentTime / audio6.duration) * 100;
        progressBar6.style.width = percentage + "%";
        animationId6 = requestAnimationFrame(updateSmoothProgress6);
    }
}

playBtn6.addEventListener('click', () => {
    if (audio6.paused) {
        audio6.play();
        playBtn6.innerText = "⏸";
        disc6.classList.add('is-playing');
        animationId6 = requestAnimationFrame(updateSmoothProgress6);
    } else {
        audio6.pause();
        playBtn6.innerText = "▶";
        disc6.classList.remove('is-playing');
        cancelAnimationFrame(animationId6);
    }
});

audio6.addEventListener('ended', () => {
    playBtn6.innerText = "▶";
    progressBar6.style.width = "0%";
    disc6.classList.remove('is-playing');
});

// ─── AUDIO: MALER KOTLA ───────────────────────────────────────────────────────
const audio = document.getElementById('coin-clink-audio');
const playBtn = document.getElementById('play-pause');
const progressBar = document.querySelector('.progress-bar');
const disc = document.querySelector('.player-disc');
let animationId;

function updateSmoothProgress() {
    if (!audio.paused && audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
        animationId = requestAnimationFrame(updateSmoothProgress);
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        disc.classList.add('is-playing');
        animationId = requestAnimationFrame(updateSmoothProgress);
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        disc.classList.remove('is-playing');
        cancelAnimationFrame(animationId);
    }
});

audio.addEventListener('ended', () => {
    playBtn.innerText = "▶";
    progressBar.style.width = "0%";
    disc.classList.remove('is-playing');
});


// ─── AUDIO: BRITISH ───────────────────────────────────────────────────────────
const audio2 = document.getElementById('coin-clink-audio-2');
const playBtn2 = document.getElementById('play-pause-2');
const progressBar2 = document.getElementById('progress-2');
const disc2 = document.getElementById('disc-2');
let animationId2;

function updateSmoothProgress2() {
    if (!audio2.paused && audio2.duration) {
        const percentage = (audio2.currentTime / audio2.duration) * 100;
        progressBar2.style.width = percentage + "%";
        animationId2 = requestAnimationFrame(updateSmoothProgress2);
    }
}

playBtn2.addEventListener('click', () => {
    if (audio2.paused) {
        audio2.play();
        playBtn2.innerText = "⏸";
        disc2.classList.add('is-playing');
        animationId2 = requestAnimationFrame(updateSmoothProgress2);
    } else {
        audio2.pause();
        playBtn2.innerText = "▶";
        disc2.classList.remove('is-playing');
        cancelAnimationFrame(animationId2);
    }
});

audio2.addEventListener('ended', () => {
    playBtn2.innerText = "▶";
    progressBar2.style.width = "0%";
    disc2.classList.remove('is-playing');
});


// ─── AUDIO: INDIA 1947 ────────────────────────────────────────────────────────
const audio3 = document.getElementById('coin-clink-audio-3');
const playBtn3 = document.getElementById('play-pause-3');
const progressBar3 = document.getElementById('progress-3');
const disc3 = document.getElementById('disc-3');
let animationId3;

function updateSmoothProgress3() {
    if (!audio3.paused && audio3.duration) {
        const percentage = (audio3.currentTime / audio3.duration) * 100;
        progressBar3.style.width = percentage + "%";
        animationId3 = requestAnimationFrame(updateSmoothProgress3);
    }
}

playBtn3.addEventListener('click', () => {
    if (audio3.paused) {
        audio3.play();
        playBtn3.innerText = "⏸";
        disc3.classList.add('is-playing');
        animationId3 = requestAnimationFrame(updateSmoothProgress3);
    } else {
        audio3.pause();
        playBtn3.innerText = "▶";
        disc3.classList.remove('is-playing');
        cancelAnimationFrame(animationId3);
    }
});

audio3.addEventListener('ended', () => {
    playBtn3.innerText = "▶";
    progressBar3.style.width = "0%";
    disc3.classList.remove('is-playing');
});


// ─── AUDIO: RUPEE ─────────────────────────────────────────────────────────────
const audio4 = document.getElementById('coin-clink-audio-4');
const playBtn4 = document.getElementById('play-pause-4');
const progressBar4 = document.getElementById('progress-4');
const disc4 = document.getElementById('disc-4');
let animationId4;

function updateSmoothProgress4() {
    if (!audio4.paused && audio4.duration) {
        const percentage = (audio4.currentTime / audio4.duration) * 100;
        progressBar4.style.width = percentage + "%";
        animationId4 = requestAnimationFrame(updateSmoothProgress4);
    }
}

playBtn4.addEventListener('click', () => {
    if (audio4.paused) {
        audio4.play();
        playBtn4.innerText = "⏸";
        disc4.classList.add('is-playing');
        animationId4 = requestAnimationFrame(updateSmoothProgress4);
    } else {
        audio4.pause();
        playBtn4.innerText = "▶";
        disc4.classList.remove('is-playing');
        cancelAnimationFrame(animationId4);
    }
});

audio4.addEventListener('ended', () => {
    playBtn4.innerText = "▶";
    progressBar4.style.width = "0%";
    disc4.classList.remove('is-playing');
});

// ─── NAV: jump to sections ────────────────────────────────────────────────────
document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');

        if (target === 'collapse') {
            // Jump to collapse scroll position (top+=4500 into circulation section)
            const circulationEl = document.querySelector('.circulation-section');
            const circulationTop = circulationEl.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: circulationTop + 4700, behavior: 'smooth' });
        }

        if (target === 'digital-shift') {
            // Jump to digital shift scroll position (top+=5700 into circulation section)
            const circulationEl = document.querySelector('.circulation-section');
            const circulationTop = circulationEl.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: circulationTop + 5900, behavior: 'smooth' });
        }
    });
});

// ─── COIN HOVER: illustration swap via JS ─────────────────────────────────────

// Maler Kotla
const mainCoin = document.getElementById("main-coin");
const malerOriginal = mainCoin.querySelector('.coin-original');
const malerIllustration = mainCoin.querySelector('.coin-illustration');

mainCoin.addEventListener('mouseenter', () => {
    gsap.to(malerOriginal, { opacity: 0, duration: 0.5 });
    gsap.to(malerIllustration, { opacity: 1, duration: 0.5 });
});
mainCoin.addEventListener('mouseleave', () => {
    gsap.to(malerOriginal, { opacity: 1, duration: 0.5 });
    gsap.to(malerIllustration, { opacity: 0, duration: 0.5 });
});

// British coin
const britishCoinWrapper = document.getElementById("british-coin");
const britishOriginal = britishCoinWrapper.querySelector('.british-original');
const britishIllustration = britishCoinWrapper.querySelector('.british-illustration');

britishCoinWrapper.addEventListener('mouseenter', () => {
    gsap.to(britishOriginal, { opacity: 1, duration: 0.5 });
    gsap.to(britishIllustration, { opacity: 0, duration: 0.5 });
});
britishCoinWrapper.addEventListener('mouseleave', () => {
    gsap.to(britishOriginal, { opacity: 0, duration: 0.5 });
    gsap.to(britishIllustration, { opacity: 1, duration: 0.5 });
});

// India 1947 coin
const indiaCoinWrapper = document.getElementById("india-coin");
const indiaOriginal = indiaCoinWrapper.querySelector('.india-original');
const indiaIllustration = indiaCoinWrapper.querySelector('.india-illustration');

indiaCoinWrapper.addEventListener('mouseenter', () => {
    gsap.to(indiaOriginal, { opacity: 1, duration: 0.5 });
    gsap.to(indiaIllustration, { opacity: 0, duration: 0.5 });
});
indiaCoinWrapper.addEventListener('mouseleave', () => {
    gsap.to(indiaOriginal, { opacity: 0, duration: 0.5 });
    gsap.to(indiaIllustration, { opacity: 1, duration: 0.5 });
});

// Rupee coin
const rupeeCoinWrapper = document.getElementById("rupee-coin");
const rupeeOriginal = rupeeCoinWrapper.querySelector('.rupee-original');
const rupeeIllustration = rupeeCoinWrapper.querySelector('.rupee-illustration');

rupeeCoinWrapper.addEventListener('mouseenter', () => {
    gsap.to(rupeeOriginal, { opacity: 1, duration: 0.5 });
    gsap.to(rupeeIllustration, { opacity: 0, duration: 0.5 });
});
rupeeCoinWrapper.addEventListener('mouseleave', () => {
    gsap.to(rupeeOriginal, { opacity: 0, duration: 0.5 });
    gsap.to(rupeeIllustration, { opacity: 1, duration: 0.5 });
});

