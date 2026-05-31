let apples = 0;
let berries = 0;
let pumpkins = 0;

let houseLevel = 1;
let fruitPower = 1;
let totalFruitScore = 0;
let isLevelUpActive = false;
let isNewspaperActive = false;
let lastTouchEndTime = 0;
let pawStepIndex = 0;
let pawWalkTimer = null;
let isBerserkActive = false;
let isBerserkQueued = false;
let berserkShotIndex = 0;
let berserkSkinTimer = null;
let berserkFinishTimer = null;
let berserkFruitTimer = null;
let berserkBaseLevel = 1;
let berserkHitCount = 0;
let isBerserkShotAnimating = false;
let berserkVisualTick = 0;

const upgradeCosts = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const BERSERK_TRIGGER_DISTANCE = 300;
const BERSERK_REQUIRED_HITS = 3;
const BERSERK_SHOT_DURATION_MS = 3000;
const BERSERK_SKIN_INTERVAL_MS = 120;
const BERSERK_FRUIT_INTERVAL_MS = 180;

const houseNames = [
    "Шалаш",
    "Дачка",
    "Домик",
    "Домище",
    "Коттедж",
    "Особняк",
    "Пентхауз",
    "Усадьба",
    "Дворец дачника",
    "Империя 6 соток"
];

const newspaperMessages = [
    "Коза соседа перешла на сторону бабушки.",
    "Сосед подал жалобу в дачный комитет. Жалобу съела коза.",
    "Бабушка отбила очередную атаку вороны. Эксперты шокированы.",
    "Ворона Лариса требует переговоров.",
    "Сосед заявил, что это нечестная конкуренция.",
    "Бабушка купила вторую лопату. Эксперты обеспокоены.",
    "Урожай достиг рекордных значений. Ворона нервничает.",
    "На участке замечена подозрительно довольная тыква.",
    "Сосед подал жалобу в дачный комитет. Жалобу съела коза.",
    "Ворона Лариса объявила сбор средств на восстановление репутации.",
    "Бабушка получила звание Заслуженный Дачный Терминатор.",
    "Эксперты не понимают, откуда у бабушки столько энергии.",
    "Ворона утверждает, что это была самооборона.",
    "Урожай снова пропал. Потом нашелся в сарае.",
    "На участке замечен резкий рост авторитета бабушки.",
    "Дачный рынок обрушился после рекордного урожая яблок."
];

const loader = document.getElementById("loader");
const onboarding = document.getElementById("onboarding");
const game = document.getElementById("game");
const prizesScreen = document.getElementById("prizesScreen");
const pawTrack = document.getElementById("pawTrack");

const startBtn = document.getElementById("startBtn");
const onboardingImage = document.getElementById("onboardingImage");
const onboardingNextBtn = document.getElementById("onboardingNextBtn");
const onboardingSkipBtn = document.getElementById("onboardingSkipBtn");
const backBtn = document.getElementById("backBtn");
const flappyModeBtn = document.getElementById("flappyModeBtn");
const flappyMode = document.getElementById("flappyMode");
const flappyBackBtn = document.getElementById("flappyBackBtn");
const flappyCanvas = document.getElementById("flappyCanvas");
const flappyScoreText = document.getElementById("flappyScore");
const flappyStartScreen = document.getElementById("flappyStartScreen");
const flappyStartBtn = document.getElementById("flappyStartBtn");
const flappyGameOver = document.getElementById("flappyGameOver");
const flappyRestartBtn = document.getElementById("flappyRestartBtn");

const neighborModeBtn = document.getElementById("neighborModeBtn");
const neighborMode = document.getElementById("neighborMode");
const neighborBackBtn = document.getElementById("neighborBackBtn");
const neighborCanvas = document.getElementById("neighborCanvas");
const neighborDistanceText = document.getElementById("neighborDistance");
const neighborStartScreen = document.getElementById("neighborStartScreen");
const neighborStartBtn = document.getElementById("neighborStartBtn");
const neighborGameOver = document.getElementById("neighborGameOver");
const neighborRestartBtn = document.getElementById("neighborRestartBtn");
const neighborWinScreen = document.getElementById("neighborWinScreen");
const neighborWinRestartBtn = document.getElementById("neighborWinRestartBtn");
const neighborGasBtn = document.getElementById("neighborGasBtn");
const neighborBrakeBtn = document.getElementById("neighborBrakeBtn");
const neighborLeanBackBtn = document.getElementById("neighborLeanBackBtn");
const neighborLeanForwardBtn = document.getElementById("neighborLeanForwardBtn");
const prizesBtn = document.getElementById("prizesBtn");
const prizesBackBtn = document.getElementById("prizesBackBtn");
const musicPrizeCards = document.querySelectorAll(".music-prize-card");
const musicPrizeEffect = document.getElementById("musicPrizeEffect");

const applesText = document.getElementById("apples");
const berriesText = document.getElementById("berries");
const pumpkinsText = document.getElementById("pumpkins");

const houseImg = document.getElementById("houseImg");
const houseNameText = document.getElementById("houseName");
const houseLevelText = document.getElementById("houseLevel");

const crow = document.getElementById("crow");
const crowImg = document.getElementById("crowImg");

let crowFlightTimer = null;
let isCrowFlying = false;
let crowTargetIndex = 0;

const crowFlightPoints = [
    { x: 48, y: 122 },
    { x: 155, y: 142 },
    { x: 238, y: 92 },
    { x: 64, y: 238 },
    { x: 212, y: 268 },
    { x: 280, y: 196 },
    { x: 122, y: 346 },
    { x: 254, y: 360 }
];

const granny = document.getElementById("granny");
const hitSwipe = document.getElementById("hitSwipe");
const berserkFlash = document.getElementById("berserkFlash");
const berserkNotice = document.getElementById("berserkNotice");

const levelUpOverlay = document.getElementById("levelUpOverlay");
const levelUpText = document.getElementById("levelUpText");

const newspaperDelivery = document.getElementById("newspaperDelivery");
const newspaperCrow = document.getElementById("newspaperCrow");
const newspaperLetter = document.getElementById("newspaperLetter");
const newspaperModal = document.getElementById("newspaperModal");
const newspaperText = document.getElementById("newspaperText");
const newspaperCloseBtn = document.getElementById("newspaperCloseBtn");

const DEFAULT_MUSIC_TRACK = "assets/fonsound.mp3";
const SAVED_MUSIC_TRACK_KEY = "s6s-main-music-track";
const bgMusic = new Audio(localStorage.getItem(SAVED_MUSIC_TRACK_KEY) || DEFAULT_MUSIC_TRACK);
bgMusic.loop = true;
bgMusic.volume = 0.5;

const onboardingMusic = new Audio("assets/termit.mp3");
onboardingMusic.loop = true;
onboardingMusic.volume = 0.6;

const onboardingSlides = [
    "assets/onb1.jpg",
    "assets/onb2.jpg",
    "assets/onb3.jpg"
];

let onboardingStep = 0;

const hitSounds = [
    new Audio("assets/kia.mp3"),
    new Audio("assets/kia_tch.mp3")
];

hitSounds.forEach((sound) => {
    sound.volume = 1.0;
});

let hitSoundIndex = 0;

const hitSoundSpecial = new Audio("assets/kia2.mp3");
hitSoundSpecial.volume = 1.0;

const levelUpSound = new Audio("assets/kia3.mp3");
levelUpSound.volume = 1.0;

const berserkSound = new Audio("assets/berserksvuk.mp3");
berserkSound.volume = 1.0;

let isMusicStarted = false;

let flappyCtx = flappyCanvas ? flappyCanvas.getContext("2d") : null;
const flappyLarisa = new Image();
flappyLarisa.src = "assets/larisa.png";

const flappyBackgrounds = [new Image(), new Image(), new Image()];
flappyBackgrounds[0].src = "assets/fonlarisa1.png";
flappyBackgrounds[1].src = "assets/fonlarisa2.png";
flappyBackgrounds[2].src = "assets/fonlarisa3.png";

const flappyShovel = new Image();
flappyShovel.src = "assets/lopata.png";

const flappyTreeOne = new Image();
flappyTreeOne.src = "assets/el1.png";

const flappyTreeTwo = new Image();
flappyTreeTwo.src = "assets/el2.png";

const flappyTreeFour = new Image();
flappyTreeFour.src = "assets/el4.png";

const flappyTreeMem = new Image();
flappyTreeMem.src = "assets/elmem.png";
let flappyAnimationId = null;
let flappyRunning = false;
let flappyBirdY = 220;
let flappyVelocity = 0;
let flappyGravity = 0.42;
let flappyJump = -7.2;
let flappyPipes = [];
let flappyMemDecorations = [];
let flappyPipeSpawnCount = 0;
let flappyLastEl4SpawnTime = 0;
let flappyLastMemSpawnTime = 0;
const FLAPPY_SPECIAL_DECOR_INTERVAL_MS = 20000;
let flappyScore = 0;
let flappyFrame = 0;
let flappyBestScore = 0;
let flappyStartTime = 0;
let flappyStageIndex = 0;

/* NEIGHBOR SUIKA MODE */

let neighborCtx = neighborCanvas ? neighborCanvas.getContext("2d") : null;
const neighborBackgroundImage = new Image();
neighborBackgroundImage.src = "assets/sosedfon.png";
neighborBackgroundImage.onerror = () => {
    if (!neighborBackgroundImage.src.includes("sosedfon.jpg")) {
        neighborBackgroundImage.src = "assets/sosedfon.jpg";
    }
};
let neighborAnimationId = null;
let neighborRunning = false;
let neighborDistance = 0;
let neighborBestDistance = 0;
let neighborFrame = 0;
let neighborGameWon = false;
let neighborLastTime = 0;
let neighborDropperX = 0;
let neighborCurrentFruit = 0;
let neighborNextFruit = 0;
let neighborFruits = [];
let neighborParticles = [];
let neighborShake = 0;
let neighborDangerTime = 0;
let neighborLastDropAt = 0;

const neighborControls = {
    left: false,
    right: false,
    drop: false,
    big: false
};

const neighborSuika = {
    width: 0,
    height: 0,
    bowlX: 0,
    bowlY: 0,
    bowlW: 0,
    bowlH: 0,
    score: 0,
    merges: 0,
    level: 1,
    gameOverLine: 0,
    canDrop: true,
    dropCooldown: 0,
    autoDropMs: 5000
};

const neighborFruitTypes = [
    { icon: "🧄", name: "чеснок", radius: 14, score: 1 },
    { icon: "🍅", name: "томат", radius: 18, score: 2 },
    { icon: "🥔", name: "картошка", radius: 22, score: 4 },
    { icon: "🥕", name: "морковка", radius: 26, score: 8 },
    { icon: "🥒", name: "огурец", radius: 31, score: 16 },
    { icon: "🍆", name: "баклажан", radius: 37, score: 32 },
    { icon: "🌽", name: "кукуруза", radius: 44, score: 64 },
    { icon: "🥬", name: "капуста", radius: 52, score: 128 },
    { icon: "🎃", name: "тыква", radius: 62, score: 256 },
    { icon: "🍉", name: "арбуз", radius: 74, score: 512 }
];

const neighborDedPhrases = [
    "Овощ к овощу!",
    "Сосед не сдаётся!",
    "Урожай давит!",
    "Тыква пошла в атаку!",
    "Грядка кипит!"
];

let neighborDedPhrase = "Собери огромный урожай!";
const crowPhrases = [
    "Одумайся!!!",
    "Одумайся!!!",
    "Одумайся!!!",
    "Ох!",
    "Ееееп!",
    "Серьезно?",
    "Сколько можно?!",
    "За что?!",
    "Каррр!",
    "Бабка, хватит!",
    "Я просто мимо летела!",
    "Опять лопатой?!",
    "Я в профсоюз ворон напишу!",
    "Это нарушение прав птиц!",
    "Дом строишь на моих страданиях!",
    "Карр... я это запомнила!",
    "Лопата - это уже перебор!",
    "Мне нужен адвокат!"
];

const grannyPhrases = [
    "Ха!",
    "Ха!",
    "Ха!",
    "Ха!",
    "Ха!",
    "Киа!",
    "Киа!",
    "Киа!",
    "Киа!",
    "Киа!",
    "На!",
    "На!",
    "За Дачу!",
    "За Удачу!",
    "За баскетболл!",
    "За Геймификацию..!)"
];

document.addEventListener("dblclick", (event) => {
    event.preventDefault();
}, { passive: false });

document.addEventListener("touchend", (event) => {
    const now = Date.now();

    if (now - lastTouchEndTime <= 300) {
        event.preventDefault();
    }

    lastTouchEndTime = now;
}, { passive: false });

window.addEventListener("load", () => {
    startPawWalk();

    setTimeout(() => {
        loader.classList.add("ready");
        stopPawWalk();
    }, 4000);
});

startBtn.addEventListener("click", () => {
    stopPawWalk();
    showOnboarding();
});

onboardingNextBtn.addEventListener("click", () => {
    onboardingStep++;

    if (onboardingStep < onboardingSlides.length) {
        onboardingImage.src = onboardingSlides[onboardingStep];
        return;
    }

    finishOnboarding();
});

onboardingSkipBtn.addEventListener("click", () => {
    finishOnboarding();
});

function finishOnboarding() {
    stopOnboardingMusic();

    onboarding.classList.add("hidden");

    startMusic();
    showGame();
}

backBtn.addEventListener("click", () => {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    isMusicStarted = false;

    stopOnboardingMusic();

    loader.classList.remove("ready");
    onboarding.classList.add("hidden");
    game.classList.add("hidden");
    prizesScreen.classList.add("hidden");
    newspaperDelivery.classList.add("hidden");
    newspaperModal.classList.add("hidden");
    stopCrowFlight();
    stopFlappyGame();
    const hud = document.querySelector(".hud");
    if (hud) hud.style.visibility = "";
    document.body.classList.remove("larisa-mode-open");
    document.body.classList.remove("neighbor-mode-open");
    if (flappyMode) flappyMode.classList.add("hidden");
    stopNeighborGame();
    if (neighborMode) neighborMode.classList.add("hidden");
    loader.classList.remove("hidden");

    isLevelUpActive = false;
    isNewspaperActive = false;
    stopBerserkMode(true);

    startPawWalk();

    setTimeout(() => {
        loader.classList.add("ready");
        stopPawWalk();
    }, 4000);
});

prizesBtn.addEventListener("click", () => {
    startMusic();
    stopCrowFlight();
    game.classList.add("hidden");
    prizesScreen.classList.remove("hidden");
});

prizesBackBtn.addEventListener("click", () => {
    prizesScreen.classList.add("hidden");
    game.classList.remove("hidden");
    startCrowFlight();
});

musicPrizeCards.forEach((card) => {
    card.addEventListener("click", () => {
        const track = card.dataset.track;
        if (!track) return;

        setMainMusicTrack(track);
        activateMusicPrizeCard(card);
        card.classList.remove("just-picked");
        void card.offsetWidth;
        card.classList.add("just-picked");
        setTimeout(() => card.classList.remove("just-picked"), 460);
        showMusicPrizeEffect(card);
        createMusicPrizeParticles(card);
    });
});

restoreMusicPrizeSelection();

crow.addEventListener("click", (event) => {
    event.preventDefault();
    hitCrow();
});

newspaperCloseBtn.addEventListener("click", () => {
    closeNewspaper();
});

if (flappyModeBtn) {
    flappyModeBtn.addEventListener("click", () => {
        openFlappyMode();
    });
}

if (flappyBackBtn) {
    flappyBackBtn.addEventListener("click", () => {
        closeFlappyMode();
    });
}

if (flappyStartBtn) {
    flappyStartBtn.addEventListener("click", () => {
        startFlappyGame();
    });
}

if (flappyRestartBtn) {
    flappyRestartBtn.addEventListener("click", () => {
        startFlappyGame();
    });
}

if (flappyCanvas) {
    flappyCanvas.addEventListener("click", () => {
        flappyFlap();
    });

    flappyCanvas.addEventListener("touchstart", (event) => {
        event.preventDefault();
        flappyFlap();
    }, { passive: false });
}

if (neighborModeBtn) {
    neighborModeBtn.addEventListener("click", () => {
        openNeighborMode();
    });
}

if (neighborBackBtn) {
    neighborBackBtn.addEventListener("click", () => {
        closeNeighborMode();
    });
}

if (neighborStartBtn) {
    neighborStartBtn.addEventListener("click", () => {
        startNeighborGame();
    });
}

if (neighborRestartBtn) {
    neighborRestartBtn.addEventListener("click", () => {
        startNeighborGame();
    });
}

if (neighborWinRestartBtn) {
    neighborWinRestartBtn.addEventListener("click", () => {
        startNeighborGame();
    });
}

setupNeighborControlButton(neighborGasBtn, "gas");
setupNeighborControlButton(neighborBrakeBtn, "brake");
setupNeighborControlButton(neighborLeanBackBtn, "leanBack");
setupNeighborControlButton(neighborLeanForwardBtn, "leanForward");

if (neighborCanvas) {
    neighborCanvas.addEventListener("pointermove", (event) => {
        if (!neighborRunning) return;
        const rect = neighborCanvas.getBoundingClientRect();
        neighborDropperX = event.clientX - rect.left;
        clampNeighborDropper();
    });

    neighborCanvas.addEventListener("pointerdown", (event) => {
        if (!neighborRunning) return;
        event.preventDefault();
        const rect = neighborCanvas.getBoundingClientRect();
        neighborDropperX = event.clientX - rect.left;
        clampNeighborDropper();
        dropNeighborFruit();
    }, { passive: false });
}

document.addEventListener("keydown", (event) => {
    if (!neighborRunning || neighborMode.classList.contains("hidden")) return;

    if (event.key === "ArrowLeft") handleNeighborControl("left");
    if (event.key === "ArrowRight") handleNeighborControl("right");
    if (event.key === "ArrowUp" || event.key === " " || event.key === "ArrowDown") handleNeighborControl("drop");
});


function setMainMusicTrack(track) {
    const wasPlaying = isMusicStarted && !bgMusic.paused;

    if (bgMusic.src.includes(track)) {
        startMusic();
        return;
    }

    localStorage.setItem(SAVED_MUSIC_TRACK_KEY, track);

    bgMusic.pause();
    bgMusic.src = track;
    bgMusic.currentTime = 0;
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    if (wasPlaying || isMusicStarted) {
        isMusicStarted = false;
        startMusic();
    }
}

function activateMusicPrizeCard(selectedCard) {
    musicPrizeCards.forEach((card) => {
        card.classList.toggle("active", card === selectedCard);
    });
}

function restoreMusicPrizeSelection() {
    const savedTrack = localStorage.getItem(SAVED_MUSIC_TRACK_KEY) || DEFAULT_MUSIC_TRACK;

    musicPrizeCards.forEach((card) => {
        card.classList.toggle("active", card.dataset.track === savedTrack);
    });
}

function showMusicPrizeEffect(card) {
    if (!musicPrizeEffect || !card) return;

    const screenRect = prizesScreen.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const x = cardRect.left - screenRect.left + cardRect.width / 2;
    const y = cardRect.top - screenRect.top + cardRect.height / 2;

    musicPrizeEffect.style.left = `${x}px`;
    musicPrizeEffect.style.top = `${y}px`;

    musicPrizeEffect.classList.remove("hidden");
    musicPrizeEffect.classList.remove("run");
    void musicPrizeEffect.offsetWidth;
    musicPrizeEffect.classList.add("run");

    setTimeout(() => {
        musicPrizeEffect.classList.add("hidden");
        musicPrizeEffect.classList.remove("run");
    }, 1200);
}

function createMusicPrizeParticles(card) {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const melodyIcons = ["♪", "♫", "♬", "♩", "🎶"];
    const confettiIcons = ["✨", "⭐", "💛", "🟡", "🟠", "🎊"];

    for (let i = 0; i < 12; i++) {
        const note = document.createElement("div");
        note.className = "floating-melody";
        note.textContent = getRandomItem(melodyIcons);
        note.style.left = `${centerX + random(-22, 22)}px`;
        note.style.top = `${centerY + random(-10, 12)}px`;
        note.style.setProperty("--x", `${random(-120, 120)}px`);
        note.style.setProperty("--y", `${random(-180, -82)}px`);
        note.style.setProperty("--rotate", `${random(-28, 28)}deg`);
        note.style.animationDelay = `${i * 0.025}s`;
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 1300);
    }

    for (let i = 0; i < 22; i++) {
        const confetti = document.createElement("div");
        confetti.className = "music-confetti";
        confetti.textContent = getRandomItem(confettiIcons);
        confetti.style.left = `${centerX + random(-28, 28)}px`;
        confetti.style.top = `${centerY + random(-18, 18)}px`;
        confetti.style.setProperty("--x", `${random(-170, 170)}px`);
        confetti.style.setProperty("--y", `${random(90, 245)}px`);
        confetti.style.setProperty("--rotate", `${random(-280, 280)}deg`);
        confetti.style.animationDelay = `${i * 0.014}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1250);
    }
}

function startPawWalk() {
    if (!pawTrack || pawWalkTimer) return;

    pawStepIndex = 0;
    pawTrack.innerHTML = "";

    createFootprint();

    pawWalkTimer = setInterval(() => {
        createFootprint();
    }, 260);
}

function stopPawWalk() {
    if (pawWalkTimer) {
        clearInterval(pawWalkTimer);
        pawWalkTimer = null;
    }

    if (pawTrack) {
        pawTrack.innerHTML = "";
    }
}

function createFootprint() {
    if (!pawTrack || loader.classList.contains("hidden") || loader.classList.contains("ready")) return;

    const loaderRect = loader.getBoundingClientRect();

    const centerX = loaderRect.width / 2 - 45;
    const startY = loaderRect.height * 0.68;
    const stepY = 34;
    const sideOffset = 16;
    const curve = Math.sin(pawStepIndex * 0.75) * 16;
    const isRightStep = pawStepIndex % 2 === 1;

    const x = centerX + curve + (isRightStep ? sideOffset : -sideOffset) + random(-5, 5);
    const y = startY - pawStepIndex * stepY + random(-4, 4);

    const footprint = document.createElement("div");
    footprint.className = "footprint";

    const rotate = isRightStep ? random(8, 18) : random(-18, -8);

    footprint.style.left = `${x}px`;
    footprint.style.top = `${y}px`;
    footprint.style.setProperty("--rotate", `${rotate}deg`);

    pawTrack.appendChild(footprint);

    setTimeout(() => {
        footprint.remove();
    }, 2200);

    pawStepIndex++;

    if (y < -60) {
        pawStepIndex = 0;
    }
}

function startOnboardingMusic() {
    onboardingMusic.currentTime = 0;

    onboardingMusic.play()
        .catch((error) => {
            console.log("Музыка онбординга не запустилась:", error);
        });
}

function stopOnboardingMusic() {
    onboardingMusic.pause();
    onboardingMusic.currentTime = 0;
}

function startMusic() {
    if (isMusicStarted) return;

    bgMusic.play()
        .then(() => {
            isMusicStarted = true;
        })
        .catch((error) => {
            console.log("Музыка не запустилась:", error);
        });
}

function playHitSound(grannyPhrase) {
    if (grannyPhrase === "За Геймификацию..!)") {
        hitSoundSpecial.currentTime = 0;
        hitSoundSpecial.play();
        return;
    }

    const sound = hitSounds[hitSoundIndex];

    sound.currentTime = 0;
    sound.play();

    hitSoundIndex = (hitSoundIndex + 1) % hitSounds.length;
}

function playLevelUpSound() {
    levelUpSound.currentTime = 0;
    levelUpSound.play();
}

function showOnboarding() {
    loader.classList.add("hidden");
    game.classList.add("hidden");
    prizesScreen.classList.add("hidden");
    newspaperDelivery.classList.add("hidden");
    newspaperModal.classList.add("hidden");
    if (flappyMode) flappyMode.classList.add("hidden");
    stopNeighborGame();
    if (neighborMode) neighborMode.classList.add("hidden");

    onboardingStep = 0;
    onboardingImage.src = onboardingSlides[onboardingStep];

    onboarding.classList.remove("hidden");
    startOnboardingMusic();
}

function showGame() {
    loader.classList.add("hidden");
    onboarding.classList.add("hidden");
    prizesScreen.classList.add("hidden");
    game.classList.remove("hidden");
    startCrowFlight();
}

function updateUI() {
    applesText.textContent = apples;
    berriesText.textContent = berries;
    pumpkinsText.textContent = pumpkins;

    houseNameText.textContent = houseNames[houseLevel - 1];
    houseLevelText.textContent = houseLevel;
    houseImg.src = `assets/dom${houseLevel}.png`;

    const nextCost = getNextCost();

    if (nextCost) {
        document.querySelector(".house-next").innerHTML =
            `До улучшения: <span id="nextUpgrade">${Math.max(0, nextCost - totalFruitScore)}</span>`;
    } else {
        document.querySelector(".house-next").textContent =
            "Продолжай, скоро приз 😎";
    }
}


function startCrowFlight() {
    if (!crow || !game || game.classList.contains("hidden")) return;
    if (isCrowFlying) return;

    isCrowFlying = true;
    crow.classList.add("crow-flying");
    moveCrowToRandomPoint(true);
    scheduleNextCrowFlight();
}

function stopCrowFlight() {
    isCrowFlying = false;

    if (crowFlightTimer) {
        clearTimeout(crowFlightTimer);
        crowFlightTimer = null;
    }
}

function scheduleNextCrowFlight() {
    if (!isCrowFlying) return;

    if (crowFlightTimer) {
        clearTimeout(crowFlightTimer);
    }

    const delay = random(1800, 3600);

    crowFlightTimer = setTimeout(() => {
        if (!isCrowFlying) return;
        moveCrowToRandomPoint(false);
        scheduleNextCrowFlight();
    }, delay);
}

function moveCrowToRandomPoint(isInstant) {
    if (!crow) return;

    const farm = document.querySelector(".farm");
    if (!farm) return;

    const farmRect = farm.getBoundingClientRect();
    const crowRect = crow.getBoundingClientRect();
    const crowWidth = Math.max(150, crowRect.width || 240);
    const crowHeight = Math.max(105, crowRect.height || 170);

    let point = getRandomItem(crowFlightPoints);

    if (crowFlightPoints.length > 1) {
        let guard = 0;
        while (crowFlightPoints.indexOf(point) === crowTargetIndex && guard < 8) {
            point = getRandomItem(crowFlightPoints);
            guard++;
        }
    }

    crowTargetIndex = crowFlightPoints.indexOf(point);

    const maxLeft = Math.max(8, farmRect.width - crowWidth + 26);
    const maxTop = Math.max(96, farmRect.height - crowHeight - 22);
    const targetLeft = Math.max(8, Math.min(maxLeft, point.x + random(-26, 26)));
    const targetTop = Math.max(92, Math.min(maxTop, point.y + random(-22, 22)));

    if (isInstant) {
        crow.classList.add("crow-no-transition");
    }

    crow.style.left = `${targetLeft}px`;
    crow.style.top = `${targetTop}px`;
    crow.style.setProperty("--crow-tilt", `${random(-8, 8)}deg`);

    if (isInstant) {
        requestAnimationFrame(() => {
            crow.classList.remove("crow-no-transition");
        });
    }
}

function makeCrowFlyAway() {
    if (!crow || !isCrowFlying) return;

    crow.classList.add("crow-rush");
    moveCrowToRandomPoint(false);

    if (crowFlightTimer) {
        clearTimeout(crowFlightTimer);
    }

    setTimeout(() => {
        crow.classList.remove("crow-rush");
        scheduleNextCrowFlight();
    }, 460);
}

function hitCrow() {
    if (isLevelUpActive || isNewspaperActive) return;

    if (isBerserkActive) {
        hitBerserkCrow();
        return;
    }

    startMusic();

    const grannyPhrase = getRandomItem(grannyPhrases);
    playHitSound(grannyPhrase);

    restartAnimation(crow, "damage");
    restartAnimation(granny, "hit");

    crowImg.src = "assets/crow-hit.png";
    granny.src = "assets/granny-hit.png";

    showHitSwipe();

    const reward = generateFruitReward();

    createFruitBurst(reward);
    createFeathers();
    showCrowPhrase();
    showGrannyPhrase(grannyPhrase);
    createPlusFromElement(crow, `+${reward.score}`);
    makeCrowFlyAway();

    totalFruitScore += reward.score;

    handleBerserkOrUpgrade();

    setTimeout(() => {
        if (isBerserkActive) return;

        crow.classList.remove("damage");
        granny.classList.remove("hit");

        crowImg.src = "assets/crow.png";
        granny.src = "assets/granny.png";
    }, 350);

    updateUI();
}

function generateFruitReward() {
    const appleGain = random(1, 3) * fruitPower;
    const berryGain = Math.random() > 0.55 ? random(1, 2) * fruitPower : 0;
    const pumpkinGain = Math.random() > 0.82 ? fruitPower : 0;

    apples += appleGain;
    berries += berryGain;
    pumpkins += pumpkinGain;

    return {
        apples: appleGain,
        berries: berryGain,
        pumpkins: pumpkinGain,
        score: appleGain * 10 + berryGain * 25 + pumpkinGain * 75
    };
}

function generateBerserkBonusReward() {
    const appleGain = random(3, 7) * fruitPower;
    const berryGain = random(2, 5) * fruitPower;
    const pumpkinGain = Math.random() > 0.45 ? random(1, 2) * fruitPower : 0;

    apples += appleGain;
    berries += berryGain;
    pumpkins += pumpkinGain;

    return {
        apples: appleGain,
        berries: berryGain,
        pumpkins: pumpkinGain,
        score: appleGain * 10 + berryGain * 25 + pumpkinGain * 75
    };
}

function handleBerserkOrUpgrade() {
    const nextCost = getNextCost();

    if (!nextCost) return;

    const leftToUpgrade = nextCost - totalFruitScore;

    if (!isBerserkQueued && !isBerserkActive && leftToUpgrade <= BERSERK_TRIGGER_DISTANCE) {
        startBerserkMode();
        return;
    }

    if (!isBerserkActive && totalFruitScore >= nextCost) {
        tryUpgradeHouse();
    }
}

function startBerserkMode() {
    if (isBerserkActive || isBerserkQueued || isLevelUpActive || isNewspaperActive) return;

    isBerserkActive = true;
    isBerserkQueued = true;
    isBerserkShotAnimating = false;
    berserkShotIndex = 0;
    berserkHitCount = 0;
    berserkBaseLevel = houseLevel;

    startMusic();
    stopCrowFlight();

    granny.classList.remove("hit");
    granny.classList.remove("berserk-shot");
    crow.classList.remove("damage");

    granny.src = "assets/berserk1.png";
    crowImg.src = "assets/crow.png";
    hitSwipe.src = "assets/hit berserk.png";

    if (berserkFlash) {
        berserkFlash.classList.remove("hidden");
        berserkFlash.classList.remove("run");
        void berserkFlash.offsetWidth;
        berserkFlash.classList.add("run");
    }

    if (berserkNotice) {
        berserkNotice.classList.remove("hidden");
        berserkNotice.classList.remove("show");
        void berserkNotice.offsetWidth;
        berserkNotice.classList.add("show");
    }

    showGrannyPhrase("Дачный мститель!");
    updateUI();
}

function hitBerserkCrow() {
    if (!isBerserkActive || isBerserkShotAnimating) return;

    if (berserkFlash) {
        berserkFlash.classList.add("hidden");
        berserkFlash.classList.remove("run");
    }

    if (berserkNotice) {
        berserkNotice.classList.add("hidden");
        berserkNotice.classList.remove("show");
    }

    isBerserkShotAnimating = true;
    berserkHitCount++;
    berserkShotIndex = 0;
    berserkVisualTick = 0;

    playBerserkSound();

    crowImg.src = "assets/crow-hit.png";
    restartAnimation(crow, "damage");

    showHitSwipe();

    const reward = generateFruitReward();
    const nextCost = getNextCost();
    const hitsLeftIncludingCurrent = Math.max(1, BERSERK_REQUIRED_HITS - berserkHitCount + 1);

    if (nextCost) {
        const missingScore = Math.max(0, nextCost - totalFruitScore);
        const neededForThisHit = Math.ceil(missingScore / hitsLeftIncludingCurrent);
        reward.score = Math.max(reward.score, neededForThisHit);
    }

    createBerserkFruitBurst(reward, true);
    createFeathers();
    createPlusFromElement(crow, `+${reward.score}`);
    showCrowPhrase();

    totalFruitScore += reward.score;
    updateUI();

    if (berserkSkinTimer) {
        clearInterval(berserkSkinTimer);
        berserkSkinTimer = null;
    }

    if (berserkFruitTimer) {
        clearInterval(berserkFruitTimer);
        berserkFruitTimer = null;
    }

    berserkSkinTimer = setInterval(() => {
        berserkShotIndex++;
        granny.src = berserkShotIndex % 2 === 0
            ? "assets/berserk2.png"
            : "assets/berserk3.png";
        restartAnimation(granny, "berserk-shot");
    }, BERSERK_SKIN_INTERVAL_MS);

    berserkFruitTimer = setInterval(() => {
        berserkVisualTick++;

        const bonusReward = generateBerserkBonusReward();

        createBerserkFruitBurst(bonusReward, false);

        if (berserkVisualTick % 3 === 0) {
            createPlusFromElement(crow, `+${bonusReward.score}`);
        }

        if (berserkVisualTick % 2 === 0) {
            updateUI();
        }
    }, BERSERK_FRUIT_INTERVAL_MS);

    if (berserkFinishTimer) {
        clearTimeout(berserkFinishTimer);
        berserkFinishTimer = null;
    }

    berserkFinishTimer = setTimeout(() => {
        if (berserkSkinTimer) {
            clearInterval(berserkSkinTimer);
            berserkSkinTimer = null;
        }

        if (berserkFruitTimer) {
            clearInterval(berserkFruitTimer);
            berserkFruitTimer = null;
        }

        crow.classList.remove("damage");
        granny.classList.remove("berserk-shot");
        crowImg.src = "assets/crow.png";
        granny.src = "assets/berserk1.png";
        isBerserkShotAnimating = false;

        if (berserkHitCount >= BERSERK_REQUIRED_HITS) {
            stopBerserkMode(false);
        }
    }, BERSERK_SHOT_DURATION_MS);
}

function stopBerserkMode(isHardReset) {
    if (berserkSkinTimer) {
        clearInterval(berserkSkinTimer);
        berserkSkinTimer = null;
    }

    if (berserkFinishTimer) {
        clearTimeout(berserkFinishTimer);
        berserkFinishTimer = null;
    }

    if (berserkFruitTimer) {
        clearInterval(berserkFruitTimer);
        berserkFruitTimer = null;
    }

    if (berserkFlash) {
        berserkFlash.classList.add("hidden");
        berserkFlash.classList.remove("run");
    }

    if (berserkNotice) {
        berserkNotice.classList.add("hidden");
        berserkNotice.classList.remove("show");
    }

    hitSwipe.src = "assets/hit-swipe.png";
    crow.classList.remove("damage");
    granny.classList.remove("hit");
    granny.classList.remove("berserk-shot");
    crowImg.src = "assets/crow.png";
    granny.src = "assets/granny.png";

    isBerserkActive = false;
    isBerserkShotAnimating = false;

    if (isHardReset) {
        isBerserkQueued = false;
        berserkHitCount = 0;
        return;
    }

    const nextCost = getNextCost();
    if (nextCost && totalFruitScore < nextCost) {
        totalFruitScore = nextCost;
    }

    tryUpgradeHouse();

    isBerserkQueued = false;
    berserkHitCount = 0;

    if (!game.classList.contains("hidden")) {
        startCrowFlight();
    }

    updateUI();
}

function playBerserkSound() {
    const sound = berserkSound.cloneNode();
    sound.volume = 1.0;
    sound.currentTime = 0;
    sound.play().catch((error) => {
        console.log("Звук дачного мстителя не запустился:", error);
    });
}

function createBerserkFruitBurst(reward, isMainReward) {
    const fruits = [];

    const fruitMultiplier = isMainReward ? 3 : 2;

    for (let i = 0; i < reward.apples * fruitMultiplier; i++) fruits.push("🍎");
    for (let i = 0; i < reward.berries * fruitMultiplier; i++) fruits.push("🫐");
    for (let i = 0; i < reward.pumpkins * fruitMultiplier; i++) fruits.push("🎃");

    while (fruits.length < 10) {
        fruits.push(getRandomItem(["🍎", "🫐", "🎃"]));
    }

    const limitedFruits = fruits.slice(0, isMainReward ? 18 : 10);
    const rect = crow.getBoundingClientRect();

    limitedFruits.forEach((fruitIcon) => {
        const fruit = document.createElement("div");
        fruit.className = "fruit berserk-fruit";
        fruit.textContent = fruitIcon;

        fruit.style.left = `${rect.left + rect.width / 2 + random(-35, 35)}px`;
        fruit.style.top = `${rect.top + rect.height / 2 + random(-25, 25)}px`;
        fruit.style.setProperty("--x", `${random(-230, 230)}px`);
        fruit.style.setProperty("--y", `${random(210, 390)}px`);

        document.body.appendChild(fruit);
        setTimeout(() => fruit.remove(), 1200);
    });
}

function tryUpgradeHouse() {
    let upgraded = false;

    while (getNextCost() && totalFruitScore >= getNextCost()) {
        houseLevel++;
        fruitPower++;
        upgraded = true;
    }

    if (upgraded) {
        houseImg.src = `assets/dom${houseLevel}.png`;
        restartAnimation(houseImg, "upgrade");
        showLevelUpCelebration();
    }
}

function showLevelUpCelebration() {
    isLevelUpActive = true;

    levelUpText.textContent = `${houseNames[houseLevel - 1]} ${houseLevel} уровень!`;

    granny.classList.add("level-up-hide");

    levelUpOverlay.classList.remove("hidden");
    void levelUpOverlay.offsetWidth;

    playLevelUpSound();

    setTimeout(() => {
        levelUpOverlay.classList.add("hidden");
        granny.classList.remove("level-up-hide");
        isLevelUpActive = false;

        showNewspaperDelivery();
    }, 3000);
}

function showNewspaperDelivery() {
    if (game.classList.contains("hidden")) return;

    isNewspaperActive = true;

    newspaperDelivery.classList.remove("hidden");
    newspaperDelivery.classList.remove("run");

    newspaperCrow.classList.remove("run");
    newspaperLetter.classList.remove("run");

    void newspaperDelivery.offsetWidth;

    newspaperDelivery.classList.add("run");
    newspaperCrow.classList.add("run");
    newspaperLetter.classList.add("run");

    setTimeout(() => {
        newspaperDelivery.classList.add("hidden");
        newspaperDelivery.classList.remove("run");
        newspaperCrow.classList.remove("run");
        newspaperLetter.classList.remove("run");

        openNewspaper();
    }, 2600);
}

function openNewspaper() {
    newspaperText.textContent = getRandomItem(newspaperMessages);

    newspaperModal.classList.remove("hidden");
    newspaperModal.classList.remove("show");

    void newspaperModal.offsetWidth;

    newspaperModal.classList.add("show");
}

function closeNewspaper() {
    newspaperModal.classList.add("hidden");
    newspaperModal.classList.remove("show");
    isNewspaperActive = false;
}

function getNextCost() {
    return upgradeCosts[houseLevel - 1] || null;
}

function showHitSwipe() {
    const rect = crow.getBoundingClientRect();

    hitSwipe.classList.remove("show");
    void hitSwipe.offsetWidth;

    hitSwipe.style.left = `${rect.left - 210}px`;
    hitSwipe.style.top = `${rect.top - 100}px`;

    hitSwipe.classList.add("show");
}

function createFruitBurst(reward) {
    const fruits = [];

    for (let i = 0; i < reward.apples; i++) fruits.push("🍎");
    for (let i = 0; i < reward.berries; i++) fruits.push("🫐");
    for (let i = 0; i < reward.pumpkins; i++) fruits.push("🎃");

    const limitedFruits = fruits.slice(0, 8);
    const rect = crow.getBoundingClientRect();

    limitedFruits.forEach((fruitIcon) => {
        const fruit = document.createElement("div");
        fruit.className = "fruit";
        fruit.textContent = fruitIcon;

        fruit.style.left = `${rect.left + rect.width / 2}px`;
        fruit.style.top = `${rect.top + rect.height / 2}px`;
        fruit.style.setProperty("--x", `${random(-160, 160)}px`);
        fruit.style.setProperty("--y", `${random(180, 320)}px`);

        document.body.appendChild(fruit);
        setTimeout(() => fruit.remove(), 1200);
    });
}

function createFeathers() {
    const rect = crow.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
        const feather = document.createElement("div");
        feather.className = "feather";
        feather.textContent = "🪶";

        feather.style.left = `${rect.left + rect.width / 2}px`;
        feather.style.top = `${rect.top + rect.height / 2}px`;
        feather.style.setProperty("--x", `${random(-180, 180)}px`);
        feather.style.setProperty("--y", `${random(-180, 120)}px`);

        document.body.appendChild(feather);
        setTimeout(() => feather.remove(), 1000);
    }
}

function showCrowPhrase() {
    const rect = crow.getBoundingClientRect();

    const phrase = document.createElement("div");
    phrase.className = "crow-phrase";
    phrase.textContent = getRandomItem(crowPhrases);

    phrase.style.left = `${rect.left + rect.width / 2 - 45}px`;
    phrase.style.top = `${rect.top - 55}px`;

    document.body.appendChild(phrase);
    setTimeout(() => phrase.remove(), 1800);
}

function showGrannyPhrase(text) {
    const rect = granny.getBoundingClientRect();

    const phrase = document.createElement("div");
    phrase.className = "granny-phrase";
    phrase.textContent = text;

    phrase.style.left = `${rect.left + rect.width * 0.42}px`;
    phrase.style.top = `${rect.top + rect.height * 0.18}px`;

    document.body.appendChild(phrase);
    setTimeout(() => phrase.remove(), 1800);
}

function createPlusFromElement(element, text) {
    const rect = element.getBoundingClientRect();

    createFixedPlus(
        rect.left + rect.width / 2,
        rect.top + 20,
        text
    );
}

function createFixedPlus(x, y, text) {
    const plus = document.createElement("div");
    plus.className = "plus";
    plus.textContent = text;

    plus.style.left = `${x}px`;
    plus.style.top = `${y}px`;

    document.body.appendChild(plus);
    setTimeout(() => plus.remove(), 900);
}

function restartAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}

function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function openFlappyMode() {
    if (!flappyMode || !flappyCanvas) return;

    startMusic();
    stopCrowFlight();
    closeNeighborMode();

    const hud = document.querySelector(".hud");
    if (hud) hud.style.visibility = "hidden";
    document.body.classList.add("larisa-mode-open");

    flappyMode.classList.remove("hidden");
    flappyStartScreen.classList.remove("hidden");
    flappyGameOver.classList.add("hidden");

    resizeFlappyCanvas();
    stopFlappyGame();
    drawFlappyIntro();
}

function closeFlappyMode() {
    stopFlappyGame();

    const hud = document.querySelector(".hud");
    if (hud) hud.style.visibility = "";
    document.body.classList.remove("larisa-mode-open");

    if (flappyMode) {
        flappyMode.classList.add("hidden");
    }

    if (!game.classList.contains("hidden")) {
        startCrowFlight();
    }
}

function resizeFlappyCanvas() {
    if (!flappyMode || !flappyCanvas) return;

    const rect = flappyMode.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    flappyCanvas.width = Math.floor(rect.width * pixelRatio);
    flappyCanvas.height = Math.floor(rect.height * pixelRatio);

    flappyCanvas.style.width = `${rect.width}px`;
    flappyCanvas.style.height = `${rect.height}px`;

    flappyCtx = flappyCanvas.getContext("2d");
    flappyCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function startFlappyGame() {
    if (!flappyCanvas || !flappyMode) return;

    resizeFlappyCanvas();

    flappyRunning = true;
    flappyBirdY = flappyMode.getBoundingClientRect().height / 2;
    flappyVelocity = 0;
    flappyPipes = [];
    flappyMemDecorations = [];
    flappyPipeSpawnCount = 0;
    flappyLastEl4SpawnTime = performance.now();
    flappyLastMemSpawnTime = performance.now() - FLAPPY_SPECIAL_DECOR_INTERVAL_MS / 2;
    flappyScore = 0;
    flappyFrame = 0;
    flappyStageIndex = 0;
    flappyStartTime = performance.now();

    flappyScoreText.textContent = flappyScore;
    flappyStartScreen.classList.add("hidden");
    flappyGameOver.classList.add("hidden");

    cancelAnimationFrame(flappyAnimationId);
    flappyLoop();
}

function stopFlappyGame() {
    flappyRunning = false;

    if (flappyAnimationId) {
        cancelAnimationFrame(flappyAnimationId);
        flappyAnimationId = null;
    }
}

function flappyFlap() {
    if (!flappyRunning) return;

    flappyVelocity = flappyJump;
}

function flappyLoop() {
    if (!flappyRunning) return;

    flappyFrame++;
    updateFlappyStage();
    flappyVelocity += flappyGravity;
    flappyBirdY += flappyVelocity;

    if (flappyFrame % 92 === 0) {
        createFlappyPipe();
    }

    updateFlappyPipes();
    drawFlappyGame();

    if (checkFlappyCollision()) {
        endFlappyGame();
        return;
    }

    flappyAnimationId = requestAnimationFrame(flappyLoop);
}


function updateFlappyStage() {
    if (!flappyStartTime) {
        flappyStageIndex = 0;
        return;
    }

    const elapsed = performance.now() - flappyStartTime;

    if (elapsed >= 120000) {
        flappyStageIndex = 2;
        return;
    }

    if (elapsed >= 60000) {
        flappyStageIndex = 1;
        return;
    }

    flappyStageIndex = 0;
}

function createFlappyPipe() {
    if (!flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    const gap = Math.max(115, Math.min(140, rect.height * 0.17));
    const minTop = 140;
    const maxTop = Math.max(minTop + 20, rect.height - gap - 190);
    const topHeight = random(minTop, Math.floor(maxTop));

    flappyPipeSpawnCount++;

    const now = performance.now();
    const canUseEl4 = flappyStageIndex === 0 || flappyStageIndex === 2;
    const canSpawnEl4 = canUseEl4 && now - flappyLastEl4SpawnTime >= FLAPPY_SPECIAL_DECOR_INTERVAL_MS;
    const canSpawnMem = !canSpawnEl4 && now - flappyLastMemSpawnTime >= FLAPPY_SPECIAL_DECOR_INTERVAL_MS;
    const isEl4Obstacle = canSpawnEl4;

    if (isEl4Obstacle) {
        flappyLastEl4SpawnTime = now;
    }

    flappyPipes.push({
        x: rect.width + 70,
        topHeight,
        gap,
        width: 88,
        passed: false,
        grannyObstacle: isEl4Obstacle,
        el4Obstacle: isEl4Obstacle,
        stage: flappyStageIndex
    });

    if (canSpawnMem) {
        flappyLastMemSpawnTime = now;
        flappyMemDecorations.push({
            x: rect.width + 330,
            y: rect.height + 82,
            width: 130,
            stage: flappyStageIndex
        });
    }
}

function updateFlappyPipes() {
    flappyPipes.forEach((pipe) => {
        pipe.x -= 4.35;

        if (!pipe.passed && pipe.x + pipe.width < 82) {
            pipe.passed = true;
            flappyScore++;
            flappyBestScore = Math.max(flappyBestScore, flappyScore);
            flappyScoreText.textContent = flappyScore;
        }
    });

    flappyMemDecorations.forEach((tree) => {
        tree.x -= 4.35;
    });

    flappyPipes = flappyPipes.filter((pipe) => pipe.x + pipe.width > -50);
    flappyMemDecorations = flappyMemDecorations.filter((tree) => tree.x + tree.width > -50);
}

function drawFlappyIntro() {
    if (!flappyCtx || !flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    drawFlappyBackground(rect.width, rect.height);

    drawFlappyLarisa(rect.width / 2, rect.height / 2 - 86, 86, 64, -0.08);

    flappyCtx.fillStyle = "rgba(255,255,255,.75)";
    flappyCtx.font = "900 18px Arial";
    flappyCtx.fillText("Тапай по экрану, чтобы лететь", rect.width / 2, rect.height / 2 + 126);
}

function drawFlappyGame() {
    if (!flappyCtx || !flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    flappyCtx.clearRect(0, 0, width, height);
    drawFlappyBackground(width, height);

    drawDecorativeTrees(width, height);
    drawFlappyMemDecorations();

    flappyPipes.forEach((pipe) => {
        drawFlappyObstacle(pipe.x, 0, pipe.width, pipe.topHeight, true, pipe.stage, pipe.grannyObstacle, pipe.el4Obstacle);
        drawFlappyObstacle(pipe.x, pipe.topHeight + pipe.gap, pipe.width, height - pipe.topHeight - pipe.gap, false, pipe.stage, pipe.grannyObstacle, pipe.el4Obstacle);
    });

    drawFlappyLarisa(
        82,
        flappyBirdY,
        78,
        58,
        Math.max(-0.55, Math.min(0.75, flappyVelocity * 0.06))
    );
}


function drawDecorativeTrees(width, height) {
    if (!flappyCtx) return;

    const treeImage = flappyStageIndex === 1 ? flappyTreeTwo : flappyTreeOne;

    if (!(treeImage.complete && treeImage.naturalWidth > 0)) {
        return;
    }

    const trees = [
        { x: width * 0.12, size: 120 },
        { x: width * 0.33, size: 150 },
        { x: width * 0.58, size: 110 },
        { x: width * 0.82, size: 140 }
    ];

    trees.forEach((tree) => {
        flappyCtx.drawImage(
            treeImage,
            tree.x - tree.size / 2,
            height - tree.size * 0.8,
            tree.size,
            tree.size
        );
    });
}

function drawFlappyMemDecorations() {
    if (!flappyCtx || !flappyMemDecorations.length) return;

    flappyMemDecorations.forEach((tree) => {
        if (flappyTreeMem.complete && flappyTreeMem.naturalWidth > 0) {
            const ratio = flappyTreeMem.naturalHeight / flappyTreeMem.naturalWidth;
            const treeWidth = tree.width;
            const treeHeight = treeWidth * ratio;

            flappyCtx.drawImage(
                flappyTreeMem,
                tree.x - treeWidth / 2,
                tree.y - treeHeight,
                treeWidth,
                treeHeight
            );
        } else {
            flappyCtx.font = "34px Arial";
            flappyCtx.textAlign = "center";
            flappyCtx.fillText("👵", tree.x, tree.y);
        }
    });
}

function drawFlappyLarisa(x, y, width, height, rotation) {
    if (!flappyCtx) return;

    flappyCtx.save();
    flappyCtx.translate(x, y);
    flappyCtx.rotate(rotation);

    if (flappyLarisa.complete && flappyLarisa.naturalWidth > 0) {
        flappyCtx.drawImage(
            flappyLarisa,
            -width / 2,
            -height / 2,
            width,
            height
        );
    } else {
        flappyCtx.font = "46px Arial";
        flappyCtx.textAlign = "center";
        flappyCtx.textBaseline = "middle";
        flappyCtx.fillText("🐦", 0, 0);
    }

    flappyCtx.restore();
}

function drawFlappyBackground(width, height) {
    const bg = flappyBackgrounds[flappyStageIndex] || flappyBackgrounds[0];

    if (bg.complete && bg.naturalWidth > 0) {
        drawCoverImage(flappyCtx, bg, 0, 0, width, height);
    } else {
        const skyGradient = flappyCtx.createLinearGradient(0, 0, 0, height);
        skyGradient.addColorStop(0, "#7dd3fc");
        skyGradient.addColorStop(0.62, "#65c7f7");
        skyGradient.addColorStop(1, "#14532d");
        flappyCtx.fillStyle = skyGradient;
        flappyCtx.fillRect(0, 0, width, height);
    }

    flappyCtx.fillStyle = "rgba(2,6,23,.12)";
    flappyCtx.fillRect(0, 0, width, height);
}

function drawFlappyObstacle(x, y, width, height, isTop, stage, grannyObstacle, el4Obstacle) {
    if (!flappyCtx || height <= 0) return;

    if (isTop) {
        const shovelHeight = Math.max(150, height + 62);
        const shovelWidth = Math.max(210, Math.min(280, shovelHeight * 0.5));
        const shovelX = x + (width - shovelWidth) / 2;
        const shovelY = y + height - shovelHeight + 22;

        if (flappyShovel.complete && flappyShovel.naturalWidth > 0) {
            flappyCtx.drawImage(flappyShovel, shovelX, shovelY, shovelWidth, shovelHeight);
        } else {
            flappyCtx.font = "62px Arial";
            flappyCtx.textAlign = "center";
            flappyCtx.fillText("🪓", x + width / 2, y + height - 18);
        }
        if (grannyObstacle) {
            flappyCtx.font = "54px Arial";
            flappyCtx.textAlign = "center";
            flappyCtx.fillText("👵", x + width / 2, y + height - 60);
        }
        return;
    }

    const treeImage = el4Obstacle ? flappyTreeFour : (stage === 1 ? flappyTreeTwo : flappyTreeOne);
    const treeWidth = Math.max(300, width * 3.0);
    const treeHeight = Math.max(260, height + 110);
    const treeX = x + (width - treeWidth) / 2;
    const treeY = y - 22;

    if (treeImage.complete && treeImage.naturalWidth > 0) {
        flappyCtx.drawImage(treeImage, treeX, treeY, treeWidth, treeHeight);
        if (grannyObstacle && !el4Obstacle) {
            flappyCtx.font = "54px Arial";
            flappyCtx.textAlign = "center";
            flappyCtx.fillText("👵", x + width / 2, treeY + 50);
        }
    } else {
        flappyCtx.font = "72px Arial";
        flappyCtx.textAlign = "center";
        flappyCtx.fillText("🌲", x + width / 2, y + 70);
    }
}

function drawCoverImage(ctx, image, x, y, width, height) {
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = width / height;
    let sourceX = 0;
    let sourceY = 0;
    let sourceW = image.naturalWidth;
    let sourceH = image.naturalHeight;

    if (imageRatio > targetRatio) {
        sourceW = image.naturalHeight * targetRatio;
        sourceX = (image.naturalWidth - sourceW) / 2;
    } else {
        sourceH = image.naturalWidth / targetRatio;
        sourceY = (image.naturalHeight - sourceH) / 2;
    }

    ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, x, y, width, height);
}

function checkFlappyCollision() {
    if (!flappyMode) return false;

    const rect = flappyMode.getBoundingClientRect();
    const birdX = 82;
    const birdY = flappyBirdY;

    // Реальная Лариса визуально больше, но для честной игры хитбокс меньше.
    // Иначе проигрыш засчитывался до видимого касания.
    const birdRadiusX = 10;
    const birdRadiusY = 12;

    if (birdY - birdRadiusY < 4 || birdY + birdRadiusY > rect.height - 4) {
        return true;
    }

    return flappyPipes.some((pipe) => {
        // Визуально лопаты и елки широкие, но зона столкновения уже.
        const hitboxPaddingX = 42;
        const hitboxPaddingY = 42;

        const inObstacleX =
            birdX + birdRadiusX > pipe.x + hitboxPaddingX &&
            birdX - birdRadiusX < pipe.x + pipe.width - hitboxPaddingX;

        if (!inObstacleX) return false;

        const hitTop = birdY - birdRadiusY < pipe.topHeight - hitboxPaddingY;
        const hitBottom = birdY + birdRadiusY > pipe.topHeight + pipe.gap + hitboxPaddingY;

        return hitTop || hitBottom;
    });
}

function endFlappyGame() {
    flappyRunning = false;
    cancelAnimationFrame(flappyAnimationId);

    if (flappyGameOver) {
        flappyGameOver.classList.remove("hidden");
        const subtitle = flappyGameOver.querySelector(".flappy-subtitle");

        if (subtitle) {
            subtitle.textContent = `Уклонений: ${flappyScore}. Рекорд: ${flappyBestScore}. Лариса почти нашла новый урожай.`;
        }
    }
}


function setupNeighborControlButton(button, controlName) {
    if (!button) return;

    const mappedControl = {
        leanBack: "left",
        brake: "big",
        gas: "drop",
        leanForward: "right"
    }[controlName] || controlName;

    button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        neighborControls[mappedControl] = true;
        handleNeighborControl(mappedControl);
    });

    button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        neighborControls[mappedControl] = false;
    });

    button.addEventListener("pointercancel", () => {
        neighborControls[mappedControl] = false;
    });

    button.addEventListener("click", (event) => {
        event.preventDefault();
    });
}

function openNeighborMode() {
    if (!neighborMode || !neighborCanvas) return;

    startMusic();
    stopCrowFlight();
    closeFlappyMode();

    document.body.classList.add("neighbor-mode-open");
    neighborMode.classList.remove("hidden");
    neighborStartScreen.classList.remove("hidden");
    neighborGameOver.classList.add("hidden");
    neighborWinScreen.classList.add("hidden");

    resizeNeighborCanvas();
    stopNeighborGame();
    drawNeighborIntro();
}

function closeNeighborMode() {
    stopNeighborGame();

    document.body.classList.remove("neighbor-mode-open");

    if (neighborMode) {
        neighborMode.classList.add("hidden");
    }

    if (!game.classList.contains("hidden")) {
        startCrowFlight();
    }
}

function resizeNeighborCanvas() {
    if (!neighborMode || !neighborCanvas) return;

    const rect = neighborMode.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    neighborCanvas.width = Math.floor(rect.width * pixelRatio);
    neighborCanvas.height = Math.floor(rect.height * pixelRatio);

    neighborCanvas.style.width = `${rect.width}px`;
    neighborCanvas.style.height = `${rect.height}px`;

    neighborCtx = neighborCanvas.getContext("2d");
    neighborCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    neighborCtx.imageSmoothingEnabled = true;

    calculateNeighborSuikaSize(rect.width, rect.height);
}

function calculateNeighborSuikaSize(width, height) {
    neighborSuika.width = width;
    neighborSuika.height = height;
    neighborSuika.bowlW = Math.min(width - 64, 352);
    neighborSuika.bowlH = Math.min(height * 0.46, 410);
    neighborSuika.bowlX = Math.floor((width - neighborSuika.bowlW) / 2);
    neighborSuika.bowlY = Math.floor(height - neighborSuika.bowlH - Math.max(52, height * 0.06));

    // Линия проигрыша теперь реально привязана к верхней части ведра.
    // Если любой старый овощ пересек эту линию - быстро считаем переполнение.
    neighborSuika.gameOverLine = neighborSuika.bowlY + 36;
    neighborDropperX = width / 2;
}

function startNeighborGame() {
    if (!neighborCanvas || !neighborMode) return;

    resizeNeighborCanvas();

    neighborRunning = true;
    neighborGameWon = false;
    neighborFrame = 0;
    neighborLastTime = performance.now();
    neighborDistance = 0;
    neighborDangerTime = 0;
    neighborShake = 0;
    neighborLastDropAt = performance.now();
    neighborFruits = [];
    neighborParticles = [];

    neighborSuika.score = 0;
    neighborSuika.merges = 0;
    neighborSuika.level = 1;
    neighborSuika.canDrop = true;
    neighborSuika.dropCooldown = 0;

    neighborCurrentFruit = random(1, 5);
    neighborNextFruit = random(1, 5);
    neighborDedPhrase = "Собери огромный урожай!";

    neighborDistanceText.textContent = "0";
    neighborStartScreen.classList.add("hidden");
    neighborGameOver.classList.add("hidden");
    neighborWinScreen.classList.add("hidden");

    cancelAnimationFrame(neighborAnimationId);
    neighborLoop(performance.now());
}

function stopNeighborGame() {
    neighborRunning = false;

    if (neighborAnimationId) {
        cancelAnimationFrame(neighborAnimationId);
        neighborAnimationId = null;
    }

    neighborControls.left = false;
    neighborControls.right = false;
    neighborControls.drop = false;
    neighborControls.big = false;
}

function neighborLoop(now) {
    if (!neighborRunning) return;

    const delta = Math.min(32, now - neighborLastTime);
    neighborLastTime = now;
    neighborFrame++;

    updateNeighborSuika(delta / 16.67);
    drawNeighborGame();

    neighborAnimationId = requestAnimationFrame(neighborLoop);
}

function handleNeighborControl(control) {
    if (!neighborRunning) return;

    if (control === "left") neighborDropperX -= 26;
    if (control === "right") neighborDropperX += 26;
    if (control === "big") neighborDedPhrase = getRandomItem(neighborDedPhrases);
    if (control === "drop") dropNeighborFruit();

    clampNeighborDropper();
}

function updateNeighborSuika(step) {
    const s = neighborSuika;
    const moveSpeed = 5.4 * step;

    if (neighborControls.left) neighborDropperX -= moveSpeed;
    if (neighborControls.right) neighborDropperX += moveSpeed;
    if (neighborControls.drop && s.canDrop) dropNeighborFruit(true);

    const now = performance.now();
    if (s.canDrop && neighborLastDropAt && now - neighborLastDropAt >= s.autoDropMs) {
        dropNeighborFruit(false);
    }

    clampNeighborDropper();

    if (!s.canDrop) {
        s.dropCooldown -= step;
        if (s.dropCooldown <= 0) s.canDrop = true;
    }

    const gravity = 0.50 * step;
    const damping = 0.935;

    neighborFruits.forEach((fruit) => {
        fruit.vy += gravity;
        fruit.x += fruit.vx * step;
        fruit.y += fruit.vy * step;
        fruit.rotation += fruit.vr * step;
        fruit.vx *= damping;
        fruit.vy *= 0.965;

        if (Math.abs(fruit.vx) + Math.abs(fruit.vy) < 0.72) {
            fruit.vx *= 0.82;
            fruit.vy *= 0.82;
            fruit.vr *= 0.86;
            fruit.settledFrames += 1;
        } else {
            fruit.settledFrames = 0;
        }
        resolveNeighborWallCollision(fruit);
    });

    for (let i = 0; i < 8; i++) {
        resolveNeighborFruitCollisions();
    }

    updateNeighborParticles(step);
    updateNeighborDanger(step);

    if (neighborShake > 0) neighborShake *= 0.88;
}

function clampNeighborDropper() {
    const fruit = neighborFruitTypes[neighborCurrentFruit];
    const minX = neighborSuika.bowlX + fruit.radius + 8;
    const maxX = neighborSuika.bowlX + neighborSuika.bowlW - fruit.radius - 8;
    neighborDropperX = Math.max(minX, Math.min(maxX, neighborDropperX));
}

function dropNeighborFruit(isManualDrop = true) {
    const s = neighborSuika;
    if (!s.canDrop) return;

    const type = neighborFruitTypes[neighborCurrentFruit];
    const fruit = {
        id: Date.now() + Math.random(),
        type: neighborCurrentFruit,
        icon: type.icon,
        radius: type.radius,
        x: Math.max(s.bowlX + type.radius + 8, Math.min(s.bowlX + s.bowlW - type.radius - 8, neighborDropperX + random(-10, 10))),
        y: s.bowlY - type.radius - 18,
        vx: random(-12, 12) / 28,
        vy: 1.9,
        rotation: random(-20, 20) / 100,
        vr: random(-7, 7) / 100,
        merged: false,
        settledFrames: 0,
        bornAt: performance.now()
    };

    neighborFruits.push(fruit);
    s.canDrop = false;
    s.dropCooldown = 9;
    neighborLastDropAt = performance.now();
    neighborCurrentFruit = neighborNextFruit;
    neighborNextFruit = random(1, Math.min(7, 4 + Math.floor(s.level / 2)));
    neighborDropperX = random(s.bowlX + 34, s.bowlX + s.bowlW - 34);
}

function resolveNeighborWallCollision(fruit) {
    const s = neighborSuika;
    const left = s.bowlX + fruit.radius;
    const right = s.bowlX + s.bowlW - fruit.radius;
    const bottom = s.bowlY + s.bowlH - fruit.radius;

    if (fruit.x < left) {
        fruit.x = left;
        fruit.vx = Math.abs(fruit.vx) * 0.18;
    }

    if (fruit.x > right) {
        fruit.x = right;
        fruit.vx = -Math.abs(fruit.vx) * 0.18;
    }

    if (fruit.y > bottom) {
        fruit.y = bottom;
        fruit.vy = -Math.abs(fruit.vy) * 0.02;
        fruit.vx *= 0.46;
        fruit.vr *= 0.42;
    }
}

function resolveNeighborFruitCollisions() {
    for (let i = 0; i < neighborFruits.length; i++) {
        const a = neighborFruits[i];
        if (a.merged) continue;

        for (let j = i + 1; j < neighborFruits.length; j++) {
            const b = neighborFruits[j];
            if (b.merged) continue;

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = a.radius + b.radius;

            if (dist >= minDist) continue;

            if (a.type === b.type && a.type < neighborFruitTypes.length - 1) {
                mergeNeighborFruits(a, b);
                continue;
            }

            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;

            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            const push = 0.016;
            a.vx -= nx * push;
            a.vy -= ny * push;
            b.vx += nx * push;
            b.vy += ny * push;

            resolveNeighborWallCollision(a);
            resolveNeighborWallCollision(b);
        }
    }

    neighborFruits = neighborFruits.filter((fruit) => !fruit.merged);
}

function mergeNeighborFruits(a, b) {
    const newType = a.type + 1;
    const type = neighborFruitTypes[newType];
    const x = (a.x + b.x) / 2;
    const y = (a.y + b.y) / 2;

    a.merged = true;
    b.merged = true;

    neighborFruits.push({
        id: Date.now() + Math.random(),
        type: newType,
        icon: type.icon,
        radius: type.radius,
        x,
        y,
        vx: (a.vx + b.vx) * 0.25,
        vy: -0.35,
        rotation: 0,
        vr: random(-8, 8) / 100,
        merged: false,
        settledFrames: 0,
        bornAt: performance.now()
    });

    neighborSuika.merges++;
    neighborSuika.score += type.score;
    neighborSuika.level = Math.floor(neighborSuika.merges / 2) + 1;
    neighborDistance = neighborSuika.score;
    neighborBestDistance = Math.max(neighborBestDistance, neighborDistance);
    neighborDistanceText.textContent = neighborSuika.score;
    neighborDedPhrase = getRandomItem(neighborDedPhrases);
    neighborShake = Math.min(4, 1 + newType * 0.35);

    createNeighborMergeParticles(x, y, type.icon, newType);

    // Максимальный овощ больше не завершает игру победой.
    // Игра продолжается, пока участок реально не переполнится.
    if (newType >= neighborFruitTypes.length - 1) {
        neighborDedPhrase = "Вот это урожай! Продолжаем!";
    }
}

function createNeighborMergeParticles(x, y, icon, type) {
    for (let i = 0; i < 14; i++) {
        neighborParticles.push({
            x,
            y,
            vx: random(-50, 50) / 12,
            vy: random(-72, 24) / 12,
            life: 42,
            maxLife: 42,
            icon: i % 3 === 0 ? icon : "✨",
            size: 16 + type * 2
        });
    }
}

function updateNeighborParticles(step) {
    neighborParticles.forEach((p) => {
        p.x += p.vx * step;
        p.y += p.vy * step;
        p.vy += 0.12 * step;
        p.life -= step;
    });

    neighborParticles = neighborParticles.filter((p) => p.life > 0);
}

function updateNeighborDanger(step) {
    const now = performance.now();

    const risky = neighborFruits.some((fruit) => {
        const oldEnough = now - fruit.bornAt > 650;
        const reachedTopLine = fruit.y - fruit.radius <= neighborSuika.gameOverLine;
        const visiblyOutsideBucket = fruit.y + fruit.radius * 0.35 <= neighborSuika.bowlY + 12;
        return oldEnough && (reachedTopLine || visiblyOutsideBucket);
    });

    if (risky) {
        neighborDangerTime += step;
    } else {
        neighborDangerTime = Math.max(0, neighborDangerTime - step * 1.6);
    }

    // Примерно 0.45 секунды над линией - проигрыш.
    // Так овощ не обязан полностью остановиться, чтобы игра закончилась.
    if (neighborDangerTime > 27) {
        endNeighborGame(false);
    }
}

function drawNeighborIntro() {
    if (!neighborCtx || !neighborMode) return;

    const rect = neighborMode.getBoundingClientRect();
    drawNeighborBackground(rect.width, rect.height);
    drawNeighborBowl();
}

function drawNeighborGame() {
    if (!neighborCtx || !neighborMode) return;

    const rect = neighborMode.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    neighborCtx.save();
    if (neighborShake > 0.4) {
        neighborCtx.translate(random(-neighborShake, neighborShake) / 2, random(-neighborShake, neighborShake) / 2);
    }

    drawNeighborBackground(width, height);
    drawNeighborBowl();
    drawNeighborDangerLine();
    drawNeighborFruits();
    drawNeighborDropper();
    drawNeighborParticles();
    neighborCtx.restore();
}

function drawNeighborBackground(width, height) {
    if (neighborBackgroundImage.complete && neighborBackgroundImage.naturalWidth > 0) {
        drawCoverImage(neighborCtx, neighborBackgroundImage, 0, 0, width, height);
    } else {
        const gradient = neighborCtx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#7dd3fc");
        gradient.addColorStop(0.58, "#bbf7d0");
        gradient.addColorStop(1, "#365314");
        neighborCtx.fillStyle = gradient;
        neighborCtx.fillRect(0, 0, width, height);
    }

    neighborCtx.fillStyle = "rgba(2, 6, 23, .08)";
    neighborCtx.fillRect(0, 0, width, height);
}

function drawNeighborCloud(x, y) {
    neighborCtx.beginPath();
    neighborCtx.arc(x, y, 18, 0, Math.PI * 2);
    neighborCtx.arc(x + 22, y - 6, 23, 0, Math.PI * 2);
    neighborCtx.arc(x + 48, y, 18, 0, Math.PI * 2);
    neighborCtx.fill();
}

function drawNeighborBowl() {
    const s = neighborSuika;

    neighborCtx.save();

    // Прозрачное ведро: чуть выше, с толстыми стеклянными стенками и видимой кромкой.
    const glassGradient = neighborCtx.createLinearGradient(0, s.bowlY, 0, s.bowlY + s.bowlH);
    glassGradient.addColorStop(0, "rgba(255,255,255,.20)");
    glassGradient.addColorStop(0.5, "rgba(255,255,255,.10)");
    glassGradient.addColorStop(1, "rgba(255,255,255,.18)");

    neighborCtx.fillStyle = glassGradient;
    neighborCtx.strokeStyle = "rgba(255,255,255,.76)";
    neighborCtx.lineWidth = 4;
    roundRect(neighborCtx, s.bowlX, s.bowlY, s.bowlW, s.bowlH, 22, true, true);

    neighborCtx.strokeStyle = "rgba(255,255,255,.42)";
    neighborCtx.lineWidth = 2;
    roundRect(neighborCtx, s.bowlX + 9, s.bowlY + 9, s.bowlW - 18, s.bowlH - 18, 18, false, true);

    neighborCtx.fillStyle = "rgba(255,255,255,.18)";
    roundRect(neighborCtx, s.bowlX + 12, s.bowlY + 12, s.bowlW - 24, 22, 11, true, false);

    neighborCtx.fillStyle = "rgba(255,255,255,.06)";
    roundRect(neighborCtx, s.bowlX + 16, s.bowlY + 48, s.bowlW - 32, s.bowlH - 64, 14, true, false);

    neighborCtx.restore();
}

function drawNeighborDangerLine() {
    const s = neighborSuika;
    const alpha = neighborDangerTime > 0 ? 0.82 + Math.sin(neighborFrame / 5) * 0.16 : 0.34;

    neighborCtx.save();
    neighborCtx.strokeStyle = `rgba(255, 80, 80, ${alpha})`;
    neighborCtx.setLineDash([10, 8]);
    neighborCtx.lineWidth = 3;
    neighborCtx.beginPath();
    neighborCtx.moveTo(s.bowlX + 12, s.gameOverLine);
    neighborCtx.lineTo(s.bowlX + s.bowlW - 12, s.gameOverLine);
    neighborCtx.stroke();
    neighborCtx.setLineDash([]);
    neighborCtx.restore();
}

function drawNeighborDropper() {
    const s = neighborSuika;
    const type = neighborFruitTypes[neighborCurrentFruit];
    const y = Math.max(118, s.bowlY - 150);

    neighborCtx.save();
    neighborCtx.strokeStyle = "rgba(255,255,255,.28)";
    neighborCtx.lineWidth = 2;
    neighborCtx.beginPath();
    neighborCtx.moveTo(neighborDropperX, 92);
    neighborCtx.lineTo(neighborDropperX, y + type.radius + 10);
    neighborCtx.stroke();

    drawNeighborFruitIcon(type.icon, neighborDropperX, y, type.radius, 0, true);
    neighborCtx.restore();
}

function drawNeighborFruits() {
    neighborFruits.forEach((fruit) => {
        drawNeighborFruitIcon(fruit.icon, fruit.x, fruit.y, fruit.radius, fruit.rotation, false);
    });
}

function drawNeighborFruitIcon(icon, x, y, radius, rotation, ghost) {
    neighborCtx.save();
    neighborCtx.translate(x, y);
    neighborCtx.rotate(rotation);

    neighborCtx.globalAlpha = ghost ? .92 : 1;

    const glowRadius = radius * (ghost ? 1.15 : 1.22);
    const glow = neighborCtx.createRadialGradient(0, 0, radius * 0.12, 0, 0, glowRadius);
    glow.addColorStop(0, ghost ? "rgba(255,255,255,.62)" : "rgba(255,255,255,.78)");
    glow.addColorStop(0.58, ghost ? "rgba(255,247,214,.32)" : "rgba(255,247,214,.46)");
    glow.addColorStop(1, "rgba(255,247,214,0)");
    neighborCtx.fillStyle = glow;
    neighborCtx.beginPath();
    neighborCtx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    neighborCtx.fill();

    neighborCtx.shadowColor = "rgba(0,0,0,.88)";
    neighborCtx.shadowBlur = ghost ? 10 : 16;
    neighborCtx.shadowOffsetY = ghost ? 4 : 8;
    neighborCtx.filter = ghost ? "saturate(1.45) brightness(1.12) contrast(1.08)" : "saturate(1.75) brightness(1.16) contrast(1.12)";
    neighborCtx.font = `${Math.floor(radius * 2.0)}px Arial`;
    neighborCtx.textAlign = "center";
    neighborCtx.textBaseline = "middle";
    neighborCtx.fillText(icon, 0, 2);

    neighborCtx.restore();
}

function drawNeighborParticles() {
    neighborParticles.forEach((p) => {
        const alpha = Math.max(0, p.life / p.maxLife);
        neighborCtx.save();
        neighborCtx.globalAlpha = alpha;
        neighborCtx.font = `${p.size}px Arial`;
        neighborCtx.textAlign = "center";
        neighborCtx.textBaseline = "middle";
        neighborCtx.fillText(p.icon, p.x, p.y);
        neighborCtx.restore();
    });
}

function drawNeighborGrandpa(width, height) {
    const x = 54;
    const y = height - 74;

    neighborCtx.save();
    neighborCtx.font = "54px Arial";
    neighborCtx.textAlign = "center";
    neighborCtx.textBaseline = "middle";
    neighborCtx.fillText("👴", x, y);

    neighborCtx.fillStyle = "#fff7d6";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 4;
    roundRect(neighborCtx, 16, y - 106, 138, 52, 16, true, true);

    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 12px Arial";
    neighborCtx.textAlign = "center";
    wrapNeighborText(neighborDedPhrase, 85, y - 84, 120, 14);
    neighborCtx.restore();
}

function wrapNeighborText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    words.forEach((word) => {
        const testLine = line ? `${line} ${word}` : word;
        if (neighborCtx.measureText(testLine).width > maxWidth && line) {
            neighborCtx.fillText(line, x, currentY);
            line = word;
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    });

    neighborCtx.fillText(line, x, currentY);
}

function drawNeighborHud(width, height) {
    neighborCtx.save();

    neighborCtx.fillStyle = "rgba(255, 247, 214, .94)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 4;
    roundRect(neighborCtx, 14, height - 92, width - 28, 58, 18, true, true);

    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 15px Arial";
    neighborCtx.textAlign = "left";
    neighborCtx.fillText(`Слияния: ${neighborSuika.merges}`, 30, height - 61);
    neighborCtx.fillText(`Уровень: ${neighborSuika.level}`, 30, height - 39);

    neighborCtx.textAlign = "right";
    neighborCtx.fillText(`Очки: ${neighborSuika.score}`, width - 30, height - 61);
    neighborCtx.fillText(`Цель: 🏡`, width - 30, height - 39);

    neighborCtx.restore();
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    const r = Math.min(radius, width / 2, height / 2);

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function endNeighborGame(isWin) {
    neighborRunning = false;
    cancelAnimationFrame(neighborAnimationId);

    if (isWin) {
        neighborWinScreen.classList.remove("hidden");
        const subtitle = neighborWinScreen.querySelector(".neighbor-subtitle");

        if (subtitle) {
            subtitle.textContent = `Собрано овощей: ${neighborSuika.score}. Сосед доволен урожаем.`;
        }
        return;
    }

    neighborGameOver.classList.remove("hidden");

    const subtitle = neighborGameOver.querySelector(".neighbor-subtitle");

    if (subtitle) {
        subtitle.textContent = `Собрано овощей: ${neighborSuika.score}. Рекорд: ${neighborBestDistance}. Участок завалило урожаем.`;
    }
}

function catchNeighborGoat() {
    return false;
}

function checkNeighborCrash() {
    return false;
}




/* FIX MODES OPEN/CLOSE v1.9 */
document.addEventListener("click", (event) => {
    const flappyButton = event.target.closest("#flappyModeBtn");
    const neighborButton = event.target.closest("#neighborModeBtn");
    const flappyBackButton = event.target.closest("#flappyBackBtn");
    const neighborBackButton = event.target.closest("#neighborBackBtn");

    if (flappyButton) {
        event.preventDefault();
        openFlappyMode();
    }

    if (neighborButton) {
        event.preventDefault();
        openNeighborMode();
    }

    if (flappyBackButton) {
        event.preventDefault();
        closeFlappyMode();
    }

    if (neighborBackButton) {
        event.preventDefault();
        closeNeighborMode();
    }
});

updateUI();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js?v=6.0");
}
