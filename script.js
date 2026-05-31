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

const upgradeCosts = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const BERSERK_TRIGGER_DISTANCE = 300;
const BERSERK_REQUIRED_HITS = 3;
const BERSERK_SHOT_DURATION_MS = 3000;
const BERSERK_SKIN_INTERVAL_MS = 120;
const BERSERK_FRUIT_INTERVAL_MS = 120;

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

const bgMusic = new Audio("assets/fonsound.mp3");
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
let flappyAnimationId = null;
let flappyRunning = false;
let flappyBirdY = 220;
let flappyVelocity = 0;
let flappyGravity = 0.42;
let flappyJump = -7.2;
let flappyPipes = [];
let flappyScore = 0;
let flappyFrame = 0;
let flappyBestScore = 0;

/* NEIGHBOR SUIKA MODE */

let neighborCtx = neighborCanvas ? neighborCanvas.getContext("2d") : null;
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
    dropCooldown: 0
};

const neighborFruitTypes = [
    { icon: "🫐", name: "ягода", radius: 16, score: 8 },
    { icon: "🍒", name: "вишня", radius: 19, score: 14 },
    { icon: "🍅", name: "томат", radius: 23, score: 24 },
    { icon: "🥔", name: "картошка", radius: 27, score: 42 },
    { icon: "🥒", name: "огурец", radius: 32, score: 75 },
    { icon: "🌽", name: "кукуруза", radius: 38, score: 120 },
    { icon: "🍆", name: "баклажан", radius: 45, score: 190 },
    { icon: "🎃", name: "тыква", radius: 54, score: 300 },
    { icon: "🏡", name: "домик", radius: 64, score: 500 }
];

const neighborDedPhrases = [
    "Скрещиваем кабачки!",
    "Дача растет!",
    "Овощ к овощу!",
    "Вот это урожайная физика!",
    "Лариса, не трогай тыкву!",
    "Сейчас будет домик!",
    "Суета на грядке!"
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

    isBerserkShotAnimating = true;
    berserkHitCount++;
    berserkShotIndex = 0;

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
        const bonusReward = generateBerserkBonusReward();

        createBerserkFruitBurst(bonusReward, false);
        createPlusFromElement(crow, `+${bonusReward.score}`);
        totalFruitScore += bonusReward.score;
        updateUI();
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

    while (fruits.length < 18) {
        fruits.push(getRandomItem(["🍎", "🫐", "🎃"]));
    }

    const limitedFruits = fruits.slice(0, isMainReward ? 28 : 20);
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

    flappyMode.classList.remove("hidden");
    flappyStartScreen.classList.remove("hidden");
    flappyGameOver.classList.add("hidden");

    resizeFlappyCanvas();
    stopFlappyGame();
    drawFlappyIntro();
}

function closeFlappyMode() {
    stopFlappyGame();

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
    flappyScore = 0;
    flappyFrame = 0;

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

function createFlappyPipe() {
    if (!flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    const gap = Math.max(150, Math.min(190, rect.height * 0.23));
    const minTop = 90;
    const maxTop = Math.max(minTop + 20, rect.height - gap - 125);
    const topHeight = random(minTop, Math.floor(maxTop));

    flappyPipes.push({
        x: rect.width + 45,
        topHeight,
        gap,
        width: 74,
        passed: false
    });
}

function updateFlappyPipes() {
    flappyPipes.forEach((pipe) => {
        pipe.x -= 3.25;

        if (!pipe.passed && pipe.x + pipe.width < 82) {
            pipe.passed = true;
            flappyScore++;
            flappyBestScore = Math.max(flappyBestScore, flappyScore);
            flappyScoreText.textContent = flappyScore;
        }
    });

    flappyPipes = flappyPipes.filter((pipe) => pipe.x + pipe.width > -50);
}

function drawFlappyIntro() {
    if (!flappyCtx || !flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    drawFlappyBackground(rect.width, rect.height);

    flappyCtx.font = "52px Arial";
    flappyCtx.textAlign = "center";
    flappyCtx.fillText("🐦", rect.width / 2, rect.height / 2 - 86);

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

    flappyPipes.forEach((pipe) => {
        drawFlappyObstacle(pipe.x, 0, pipe.width, pipe.topHeight, true);
        drawFlappyObstacle(pipe.x, pipe.topHeight + pipe.gap, pipe.width, height - pipe.topHeight - pipe.gap, false);
    });

    flappyCtx.save();
    flappyCtx.translate(82, flappyBirdY);
    flappyCtx.rotate(Math.max(-0.55, Math.min(0.75, flappyVelocity * 0.06)));
    flappyCtx.font = "46px Arial";
    flappyCtx.textAlign = "center";
    flappyCtx.textBaseline = "middle";
    flappyCtx.fillText("🐦", 0, 0);
    flappyCtx.restore();
}

function drawFlappyBackground(width, height) {
    const skyGradient = flappyCtx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, "#8fd8f7");
    skyGradient.addColorStop(0.62, "#65c7f7");
    skyGradient.addColorStop(1, "#4ade80");

    flappyCtx.fillStyle = skyGradient;
    flappyCtx.fillRect(0, 0, width, height);

    flappyCtx.fillStyle = "rgba(255,255,255,.55)";
    flappyCtx.beginPath();
    flappyCtx.arc(width * 0.18, 120, 24, 0, Math.PI * 2);
    flappyCtx.arc(width * 0.25, 118, 34, 0, Math.PI * 2);
    flappyCtx.arc(width * 0.34, 124, 22, 0, Math.PI * 2);
    flappyCtx.fill();

    flappyCtx.beginPath();
    flappyCtx.arc(width * 0.68, 180, 20, 0, Math.PI * 2);
    flappyCtx.arc(width * 0.75, 178, 28, 0, Math.PI * 2);
    flappyCtx.arc(width * 0.83, 184, 18, 0, Math.PI * 2);
    flappyCtx.fill();
}

function drawFlappyObstacle(x, y, width, height, isTop) {
    flappyCtx.fillStyle = "#5b3417";
    flappyCtx.fillRect(x, y, width, height);

    flappyCtx.fillStyle = "#3a1e0c";

    if (isTop) {
        flappyCtx.fillRect(x - 8, y + height - 20, width + 16, 20);
    } else {
        flappyCtx.fillRect(x - 8, y, width + 16, 20);
    }

    flappyCtx.font = "28px Arial";
    flappyCtx.textAlign = "center";

    for (let i = y + 42; i < y + height - 20; i += 58) {
        flappyCtx.fillText("🪵", x + width / 2, i);
    }
}

function checkFlappyCollision() {
    if (!flappyMode) return false;

    const rect = flappyMode.getBoundingClientRect();
    const birdX = 82;
    const birdY = flappyBirdY;
    const radius = 22;

    if (birdY - radius < 0 || birdY + radius > rect.height) {
        return true;
    }

    return flappyPipes.some((pipe) => {
        const inPipeX = birdX + radius > pipe.x && birdX - radius < pipe.x + pipe.width;
        const hitTop = birdY - radius < pipe.topHeight;
        const hitBottom = birdY + radius > pipe.topHeight + pipe.gap;
        return inPipeX && (hitTop || hitBottom);
    });
}

function endFlappyGame() {
    flappyRunning = false;
    cancelAnimationFrame(flappyAnimationId);

    if (flappyGameOver) {
        flappyGameOver.classList.remove("hidden");
        const subtitle = flappyGameOver.querySelector(".flappy-subtitle");

        if (subtitle) {
            subtitle.textContent = `Уклонений: ${flappyScore}. Рекорд: ${flappyBestScore}. Лариса требует реванш.`;
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
    neighborSuika.bowlW = Math.min(width - 34, 390);
    neighborSuika.bowlH = Math.min(height - 190, 640);
    neighborSuika.bowlX = Math.floor((width - neighborSuika.bowlW) / 2);
    neighborSuika.bowlY = 112;
    neighborSuika.gameOverLine = neighborSuika.bowlY + 74;
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
    neighborFruits = [];
    neighborParticles = [];

    neighborSuika.score = 0;
    neighborSuika.merges = 0;
    neighborSuika.level = 1;
    neighborSuika.canDrop = true;
    neighborSuika.dropCooldown = 0;

    neighborCurrentFruit = random(0, 3);
    neighborNextFruit = random(0, 3);
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
    if (neighborControls.drop && s.canDrop) dropNeighborFruit();

    clampNeighborDropper();

    if (!s.canDrop) {
        s.dropCooldown -= step;
        if (s.dropCooldown <= 0) s.canDrop = true;
    }

    const gravity = 0.34 * step;
    const damping = 0.986;

    neighborFruits.forEach((fruit) => {
        fruit.vy += gravity;
        fruit.x += fruit.vx * step;
        fruit.y += fruit.vy * step;
        fruit.rotation += fruit.vr * step;
        fruit.vx *= damping;
        fruit.vy *= 0.997;
        fruit.settledFrames = Math.abs(fruit.vx) + Math.abs(fruit.vy) < 0.35 ? fruit.settledFrames + 1 : 0;
        resolveNeighborWallCollision(fruit);
    });

    for (let i = 0; i < 4; i++) {
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

function dropNeighborFruit() {
    const s = neighborSuika;
    if (!s.canDrop) return;

    const type = neighborFruitTypes[neighborCurrentFruit];
    const fruit = {
        id: Date.now() + Math.random(),
        type: neighborCurrentFruit,
        icon: type.icon,
        radius: type.radius,
        x: neighborDropperX,
        y: s.bowlY + 28,
        vx: random(-8, 8) / 30,
        vy: 1.2,
        rotation: random(-20, 20) / 100,
        vr: random(-7, 7) / 100,
        merged: false,
        settledFrames: 0,
        bornAt: performance.now()
    };

    neighborFruits.push(fruit);
    s.canDrop = false;
    s.dropCooldown = 18;
    neighborCurrentFruit = neighborNextFruit;
    neighborNextFruit = random(0, Math.min(4, 2 + s.level));
}

function resolveNeighborWallCollision(fruit) {
    const s = neighborSuika;
    const left = s.bowlX + fruit.radius;
    const right = s.bowlX + s.bowlW - fruit.radius;
    const bottom = s.bowlY + s.bowlH - fruit.radius;

    if (fruit.x < left) {
        fruit.x = left;
        fruit.vx = Math.abs(fruit.vx) * 0.55;
    }

    if (fruit.x > right) {
        fruit.x = right;
        fruit.vx = -Math.abs(fruit.vx) * 0.55;
    }

    if (fruit.y > bottom) {
        fruit.y = bottom;
        fruit.vy = -Math.abs(fruit.vy) * 0.22;
        fruit.vx *= 0.82;
        fruit.vr *= 0.85;
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

            const push = 0.045;
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
        vy: -1.6,
        rotation: 0,
        vr: random(-8, 8) / 100,
        merged: false,
        settledFrames: 0,
        bornAt: performance.now()
    });

    neighborSuika.merges++;
    neighborSuika.score += type.score;
    neighborSuika.level = Math.floor(neighborSuika.merges / 5) + 1;
    neighborDistance = neighborSuika.score;
    neighborBestDistance = Math.max(neighborBestDistance, neighborDistance);
    neighborDistanceText.textContent = neighborSuika.score;
    neighborDedPhrase = getRandomItem(neighborDedPhrases);
    neighborShake = Math.min(12, 5 + newType);

    createNeighborMergeParticles(x, y, type.icon, newType);

    if (newType >= neighborFruitTypes.length - 1) {
        endNeighborGame(true);
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
        const oldEnough = now - fruit.bornAt > 2200;
        return oldEnough && fruit.y - fruit.radius < neighborSuika.gameOverLine && fruit.settledFrames > 40;
    });

    if (risky) {
        neighborDangerTime += step;
    } else {
        neighborDangerTime = Math.max(0, neighborDangerTime - step * 2.2);
    }

    if (neighborDangerTime > 150) {
        endNeighborGame(false);
    }
}

function drawNeighborIntro() {
    if (!neighborCtx || !neighborMode) return;

    const rect = neighborMode.getBoundingClientRect();
    drawNeighborBackground(rect.width, rect.height);
    drawNeighborBowl();
    drawNeighborGrandpa(rect.width, rect.height);

    neighborCtx.save();
    neighborCtx.fillStyle = "rgba(255,255,255,.9)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 5;
    roundRect(neighborCtx, 28, rect.height - 216, rect.width - 56, 92, 22, true, true);
    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 17px Arial";
    neighborCtx.textAlign = "center";
    neighborCtx.fillText("Соединяй одинаковые овощи", rect.width / 2, rect.height - 176);
    neighborCtx.font = "900 14px Arial";
    neighborCtx.fillText("Цель: вырастить домик 🏡", rect.width / 2, rect.height - 150);
    neighborCtx.restore();
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
    drawNeighborGrandpa(width, height);
    drawNeighborHud(width, height);
    neighborCtx.restore();
}

function drawNeighborBackground(width, height) {
    const gradient = neighborCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#7dd3fc");
    gradient.addColorStop(0.46, "#bbf7d0");
    gradient.addColorStop(1, "#4d7c0f");

    neighborCtx.fillStyle = gradient;
    neighborCtx.fillRect(0, 0, width, height);

    neighborCtx.fillStyle = "rgba(255,255,255,.55)";
    for (let i = 0; i < 5; i++) {
        const x = (i * 135 + neighborFrame * 0.2) % (width + 130) - 80;
        const y = 92 + i * 12 + Math.sin((neighborFrame + i * 31) / 34) * 8;
        drawNeighborCloud(x, y);
    }

    neighborCtx.fillStyle = "rgba(91,52,23,.92)";
    neighborCtx.fillRect(0, height - 24, width, 24);

    neighborCtx.fillStyle = "rgba(255,255,255,.18)";
    for (let i = 0; i < 18; i++) {
        const x = (i * 29 + neighborFrame * 0.35) % width;
        neighborCtx.fillText("🌱", x, height - 34 - (i % 3) * 8);
    }
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
    neighborCtx.fillStyle = "rgba(255, 247, 214, .7)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 7;
    roundRect(neighborCtx, s.bowlX, s.bowlY, s.bowlW, s.bowlH, 26, true, true);

    neighborCtx.fillStyle = "rgba(255,255,255,.22)";
    roundRect(neighborCtx, s.bowlX + 10, s.bowlY + 10, s.bowlW - 20, s.bowlH - 20, 20, true, false);

    neighborCtx.strokeStyle = "rgba(91,52,23,.12)";
    neighborCtx.lineWidth = 1;
    for (let y = s.bowlY + 38; y < s.bowlY + s.bowlH - 20; y += 38) {
        neighborCtx.beginPath();
        neighborCtx.moveTo(s.bowlX + 14, y);
        neighborCtx.lineTo(s.bowlX + s.bowlW - 14, y);
        neighborCtx.stroke();
    }

    neighborCtx.restore();
}

function drawNeighborDangerLine() {
    const s = neighborSuika;
    const alpha = neighborDangerTime > 0 ? 0.75 + Math.sin(neighborFrame / 5) * 0.2 : 0.34;

    neighborCtx.save();
    neighborCtx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
    neighborCtx.setLineDash([8, 8]);
    neighborCtx.lineWidth = 3;
    neighborCtx.beginPath();
    neighborCtx.moveTo(s.bowlX + 12, s.gameOverLine);
    neighborCtx.lineTo(s.bowlX + s.bowlW - 12, s.gameOverLine);
    neighborCtx.stroke();
    neighborCtx.setLineDash([]);
    neighborCtx.fillStyle = `rgba(127, 29, 29, ${alpha})`;
    neighborCtx.font = "900 12px Arial";
    neighborCtx.textAlign = "right";
    neighborCtx.fillText("опасная грядка", s.bowlX + s.bowlW - 16, s.gameOverLine - 8);
    neighborCtx.restore();
}

function drawNeighborDropper() {
    const s = neighborSuika;
    const type = neighborFruitTypes[neighborCurrentFruit];
    const y = s.bowlY + 32;

    neighborCtx.save();
    neighborCtx.strokeStyle = "rgba(58,30,12,.38)";
    neighborCtx.lineWidth = 3;
    neighborCtx.beginPath();
    neighborCtx.moveTo(neighborDropperX, s.bowlY + 2);
    neighborCtx.lineTo(neighborDropperX, y + type.radius + 14);
    neighborCtx.stroke();

    neighborCtx.fillStyle = "rgba(255,255,255,.9)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 4;
    roundRect(neighborCtx, neighborDropperX - 42, s.bowlY - 48, 84, 40, 17, true, true);
    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 12px Arial";
    neighborCtx.textAlign = "center";
    neighborCtx.fillText(`Дальше ${neighborFruitTypes[neighborNextFruit].icon}`, neighborDropperX, s.bowlY - 23);

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

    neighborCtx.fillStyle = ghost ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.82)";
    neighborCtx.strokeStyle = "rgba(91,52,23,.55)";
    neighborCtx.lineWidth = Math.max(2, radius * 0.08);
    neighborCtx.beginPath();
    neighborCtx.arc(0, 0, radius, 0, Math.PI * 2);
    neighborCtx.fill();
    neighborCtx.stroke();

    neighborCtx.font = `${Math.floor(radius * 1.45)}px Arial`;
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
            subtitle.textContent = `Очки: ${neighborSuika.score}. Дед вырастил домик из урожая.`;
        }
        return;
    }

    neighborGameOver.classList.remove("hidden");

    const subtitle = neighborGameOver.querySelector(".neighbor-subtitle");

    if (subtitle) {
        subtitle.textContent = `Очки: ${neighborSuika.score}. Рекорд: ${neighborBestDistance}. Участок завалило урожаем.`;
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