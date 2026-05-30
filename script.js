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

const upgradeCosts = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];

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
const granny = document.getElementById("granny");
const hitSwipe = document.getElementById("hitSwipe");

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

/* NEIGHBOR TETRIS MODE */

let neighborCtx = neighborCanvas ? neighborCanvas.getContext("2d") : null;
let neighborAnimationId = null;
let neighborRunning = false;
let neighborDistance = 0;
let neighborBestDistance = 0;
let neighborFrame = 0;
let neighborDropTimer = 0;
let neighborDropInterval = 650;
let neighborLastTime = 0;
let neighborGameWon = false;
let neighborNextPiece = null;

const neighborControls = {
    left: false,
    right: false,
    rotate: false,
    down: false
};

const neighborTetris = {
    cols: 10,
    rows: 18,
    board: [],
    piece: null,
    cell: 24,
    boardX: 0,
    boardY: 0,
    score: 0,
    lines: 0,
    level: 1,
    buildStage: 0
};

const neighborPieces = [
    { icon: "🥔", matrix: [[1, 1, 1, 1]] },
    { icon: "🥕", matrix: [[1, 0, 0], [1, 1, 1]] },
    { icon: "🌽", matrix: [[0, 0, 1], [1, 1, 1]] },
    { icon: "🧅", matrix: [[1, 1], [1, 1]] },
    { icon: "🍅", matrix: [[0, 1, 1], [1, 1, 0]] },
    { icon: "🥒", matrix: [[0, 1, 0], [1, 1, 1]] },
    { icon: "🎃", matrix: [[1, 1, 0], [0, 1, 1]] }
];

const neighborDedPhrases = [
    "Фундамент из картошки!",
    "Вот это стройка!",
    "Дача сама себя не построит!",
    "Овощ к овощу!",
    "Лариса, не мешай!",
    "Сейчас сарай поднимем!",
    "Архитектура 6 соток!"
];

let neighborDedPhrase = "Дача сама себя не построит!";
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
    stopFlappyGame();
    if (flappyMode) flappyMode.classList.add("hidden");
    stopNeighborGame();
    if (neighborMode) neighborMode.classList.add("hidden");
    loader.classList.remove("hidden");

    isLevelUpActive = false;
    isNewspaperActive = false;

    startPawWalk();

    setTimeout(() => {
        loader.classList.add("ready");
        stopPawWalk();
    }, 4000);
});

prizesBtn.addEventListener("click", () => {
    startMusic();
    game.classList.add("hidden");
    prizesScreen.classList.remove("hidden");
});

prizesBackBtn.addEventListener("click", () => {
    prizesScreen.classList.add("hidden");
    game.classList.remove("hidden");
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
    neighborCanvas.addEventListener("click", (event) => {
        if (!neighborRunning) return;

        const rect = neighborCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;

        if (x < rect.width / 2) {
            handleNeighborControl("left");
        } else {
            handleNeighborControl("right");
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (!neighborRunning || neighborMode.classList.contains("hidden")) return;

    if (event.key === "ArrowLeft") handleNeighborControl("left");
    if (event.key === "ArrowRight") handleNeighborControl("right");
    if (event.key === "ArrowUp" || event.key === " ") handleNeighborControl("rotate");
    if (event.key === "ArrowDown") handleNeighborControl("down");
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
            `До улучшения: <span id="nextUpgrade">${nextCost - totalFruitScore}</span>`;
    } else {
        document.querySelector(".house-next").textContent =
            "Продолжай, скоро приз 😎";
    }
}

function hitCrow() {
    if (isLevelUpActive || isNewspaperActive) return;

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

    totalFruitScore += reward.score;

    tryUpgradeHouse();

    setTimeout(() => {
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
        brake: "rotate",
        gas: "down",
        leanForward: "right"
    }[controlName] || controlName;

    button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        handleNeighborControl(mappedControl);
        neighborControls[mappedControl] = true;
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

    calculateNeighborBoardSize(rect.width, rect.height);
}

function calculateNeighborBoardSize(width, height) {
    const topSpace = 92;
    const bottomSpace = 98;
    const maxBoardWidth = width - 118;
    const maxBoardHeight = height - topSpace - bottomSpace;

    neighborTetris.cell = Math.floor(Math.min(maxBoardWidth / neighborTetris.cols, maxBoardHeight / neighborTetris.rows));
    neighborTetris.cell = Math.max(17, Math.min(28, neighborTetris.cell));
    neighborTetris.boardX = Math.floor((width - neighborTetris.cell * neighborTetris.cols) / 2) + 24;
    neighborTetris.boardY = topSpace;
}

function startNeighborGame() {
    if (!neighborCanvas || !neighborMode) return;

    resizeNeighborCanvas();

    neighborRunning = true;
    neighborGameWon = false;
    neighborDistance = 0;
    neighborFrame = 0;
    neighborDropTimer = 0;
    neighborDropInterval = 650;
    neighborLastTime = performance.now();
    neighborDedPhrase = "Дача сама себя не построит!";

    neighborTetris.score = 0;
    neighborTetris.lines = 0;
    neighborTetris.level = 1;
    neighborTetris.buildStage = 0;
    neighborTetris.board = createNeighborBoard();
    neighborNextPiece = createNeighborPiece();
    spawnNeighborPiece();

    neighborDistanceText.textContent = "0";
    neighborStartScreen.classList.add("hidden");
    neighborGameOver.classList.add("hidden");
    neighborWinScreen.classList.add("hidden");

    cancelAnimationFrame(neighborAnimationId);
    neighborLoop(performance.now());
}

function createNeighborBoard() {
    return Array.from({ length: neighborTetris.rows }, () => Array(neighborTetris.cols).fill(null));
}

function createNeighborPiece() {
    const template = getRandomItem(neighborPieces);

    return {
        icon: template.icon,
        matrix: template.matrix.map((row) => row.slice()),
        x: 3,
        y: 0
    };
}

function spawnNeighborPiece() {
    neighborTetris.piece = neighborNextPiece || createNeighborPiece();
    neighborNextPiece = createNeighborPiece();
    neighborTetris.piece.x = Math.floor((neighborTetris.cols - neighborTetris.piece.matrix[0].length) / 2);
    neighborTetris.piece.y = 0;

    if (neighborCollides(neighborTetris.piece, 0, 0, neighborTetris.piece.matrix)) {
        endNeighborGame(false);
    }
}

function stopNeighborGame() {
    neighborRunning = false;

    if (neighborAnimationId) {
        cancelAnimationFrame(neighborAnimationId);
        neighborAnimationId = null;
    }

    neighborControls.left = false;
    neighborControls.right = false;
    neighborControls.rotate = false;
    neighborControls.down = false;
}

function neighborLoop(now) {
    if (!neighborRunning) return;

    const delta = now - neighborLastTime;
    neighborLastTime = now;
    neighborFrame++;

    neighborDropTimer += delta;

    const activeInterval = neighborControls.down ? 48 : neighborDropInterval;

    if (neighborDropTimer >= activeInterval) {
        neighborDropTimer = 0;
        moveNeighborPiece(0, 1);
    }

    drawNeighborGame();
    neighborAnimationId = requestAnimationFrame(neighborLoop);
}

function handleNeighborControl(control) {
    if (!neighborRunning) return;

    if (control === "left") moveNeighborPiece(-1, 0);
    if (control === "right") moveNeighborPiece(1, 0);
    if (control === "rotate") rotateNeighborPiece();
    if (control === "down") moveNeighborPiece(0, 1);

    drawNeighborGame();
}

function moveNeighborPiece(dx, dy) {
    const piece = neighborTetris.piece;
    if (!piece) return false;

    if (!neighborCollides(piece, dx, dy, piece.matrix)) {
        piece.x += dx;
        piece.y += dy;
        return true;
    }

    if (dy > 0) {
        lockNeighborPiece();
        clearNeighborLines();
        spawnNeighborPiece();
    }

    return false;
}

function rotateNeighborPiece() {
    const piece = neighborTetris.piece;
    if (!piece) return;

    const rotated = piece.matrix[0].map((_, index) => piece.matrix.map((row) => row[index]).reverse());

    if (!neighborCollides(piece, 0, 0, rotated)) {
        piece.matrix = rotated;
        return;
    }

    if (!neighborCollides(piece, -1, 0, rotated)) {
        piece.x -= 1;
        piece.matrix = rotated;
        return;
    }

    if (!neighborCollides(piece, 1, 0, rotated)) {
        piece.x += 1;
        piece.matrix = rotated;
    }
}

function neighborCollides(piece, dx, dy, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (!matrix[y][x]) continue;

            const boardX = piece.x + x + dx;
            const boardY = piece.y + y + dy;

            if (boardX < 0 || boardX >= neighborTetris.cols || boardY >= neighborTetris.rows) {
                return true;
            }

            if (boardY >= 0 && neighborTetris.board[boardY][boardX]) {
                return true;
            }
        }
    }

    return false;
}

function lockNeighborPiece() {
    const piece = neighborTetris.piece;
    if (!piece) return;

    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (!value) return;

            const boardY = piece.y + y;
            const boardX = piece.x + x;

            if (boardY >= 0 && boardY < neighborTetris.rows && boardX >= 0 && boardX < neighborTetris.cols) {
                neighborTetris.board[boardY][boardX] = piece.icon;
            }
        });
    });
}

function clearNeighborLines() {
    let cleared = 0;

    for (let y = neighborTetris.rows - 1; y >= 0; y--) {
        if (neighborTetris.board[y].every(Boolean)) {
            neighborTetris.board.splice(y, 1);
            neighborTetris.board.unshift(Array(neighborTetris.cols).fill(null));
            cleared++;
            y++;
        }
    }

    if (!cleared) return;

    neighborTetris.lines += cleared;
    neighborTetris.score += cleared * cleared * 100;
    neighborTetris.level = Math.floor(neighborTetris.lines / 4) + 1;
    neighborTetris.buildStage = Math.min(5, Math.floor(neighborTetris.lines / 2));
    neighborDistance = neighborTetris.score;
    neighborBestDistance = Math.max(neighborBestDistance, neighborDistance);
    neighborDropInterval = Math.max(180, 650 - neighborTetris.level * 42);
    neighborDedPhrase = getRandomItem(neighborDedPhrases);
    neighborDistanceText.textContent = neighborTetris.score;

    if (neighborTetris.lines >= 12) {
        endNeighborGame(true);
    }
}

function drawNeighborIntro() {
    if (!neighborCtx || !neighborMode) return;

    const rect = neighborMode.getBoundingClientRect();
    drawNeighborBackground(rect.width, rect.height);
    drawNeighborGrandpa(rect.width, rect.height);
    drawNeighborHouse(rect.width - 82, rect.height - 132, 3);

    neighborCtx.save();
    neighborCtx.fillStyle = "rgba(255,255,255,.9)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 5;
    roundRect(neighborCtx, 36, rect.height - 205, rect.width - 72, 76, 18, true, true);
    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 17px Arial";
    neighborCtx.textAlign = "center";
    neighborCtx.fillText("Кнопки снизу: ←  ↻  ↓  →", rect.width / 2, rect.height - 164);
    neighborCtx.font = "900 14px Arial";
    neighborCtx.fillText("Очисти 12 рядов, чтобы достроить дачу", rect.width / 2, rect.height - 140);
    neighborCtx.restore();
}

function drawNeighborGame() {
    if (!neighborCtx || !neighborMode) return;

    const rect = neighborMode.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    drawNeighborBackground(width, height);
    drawNeighborBoard();
    drawNeighborPiece();
    drawNeighborGrandpa(width, height);
    drawNeighborHouse(width - 78, height - 128, neighborTetris.buildStage);
    drawNeighborHud(width, height);
}

function drawNeighborBackground(width, height) {
    const gradient = neighborCtx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#8fd8f7");
    gradient.addColorStop(0.58, "#b8f7a4");
    gradient.addColorStop(1, "#65a30d");

    neighborCtx.fillStyle = gradient;
    neighborCtx.fillRect(0, 0, width, height);

    neighborCtx.fillStyle = "rgba(255,255,255,.55)";
    for (let i = 0; i < 4; i++) {
        const x = (i * 145 + neighborFrame * 0.18) % (width + 130) - 80;
        const y = 118 + Math.sin((neighborFrame + i * 31) / 34) * 8;
        drawNeighborCloud(x, y);
    }

    neighborCtx.fillStyle = "rgba(91,52,23,.9)";
    neighborCtx.fillRect(0, height - 22, width, 22);
}

function drawNeighborCloud(x, y) {
    neighborCtx.beginPath();
    neighborCtx.arc(x, y, 18, 0, Math.PI * 2);
    neighborCtx.arc(x + 22, y - 6, 23, 0, Math.PI * 2);
    neighborCtx.arc(x + 48, y, 18, 0, Math.PI * 2);
    neighborCtx.fill();
}

function drawNeighborBoard() {
    const t = neighborTetris;
    const width = t.cols * t.cell;
    const height = t.rows * t.cell;

    neighborCtx.save();
    neighborCtx.fillStyle = "rgba(255, 247, 214, .92)";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 5;
    roundRect(neighborCtx, t.boardX - 8, t.boardY - 8, width + 16, height + 16, 16, true, true);

    neighborCtx.fillStyle = "rgba(91, 52, 23, .1)";
    for (let y = 0; y < t.rows; y++) {
        for (let x = 0; x < t.cols; x++) {
            neighborCtx.strokeStyle = "rgba(91,52,23,.16)";
            neighborCtx.lineWidth = 1;
            neighborCtx.strokeRect(t.boardX + x * t.cell, t.boardY + y * t.cell, t.cell, t.cell);

            if (t.board[y][x]) {
                drawNeighborBlock(t.board[y][x], t.boardX + x * t.cell, t.boardY + y * t.cell, t.cell);
            }
        }
    }

    neighborCtx.restore();
}

function drawNeighborPiece() {
    const piece = neighborTetris.piece;
    if (!piece) return;

    piece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (!value) return;
            drawNeighborBlock(
                piece.icon,
                neighborTetris.boardX + (piece.x + x) * neighborTetris.cell,
                neighborTetris.boardY + (piece.y + y) * neighborTetris.cell,
                neighborTetris.cell
            );
        });
    });
}

function drawNeighborBlock(icon, x, y, size) {
    neighborCtx.save();
    neighborCtx.fillStyle = "rgba(255,255,255,.55)";
    neighborCtx.fillRect(x + 2, y + 2, size - 4, size - 4);
    neighborCtx.font = `${Math.floor(size * 0.82)}px Arial`;
    neighborCtx.textAlign = "center";
    neighborCtx.textBaseline = "middle";
    neighborCtx.fillText(icon, x + size / 2, y + size / 2 + 1);
    neighborCtx.restore();
}

function drawNeighborGrandpa(width, height) {
    const x = 50;
    const y = height - 74;

    neighborCtx.save();
    neighborCtx.font = "54px Arial";
    neighborCtx.textAlign = "center";
    neighborCtx.textBaseline = "middle";
    neighborCtx.fillText("👴", x, y);

    neighborCtx.fillStyle = "#fff7d6";
    neighborCtx.strokeStyle = "#5b3417";
    neighborCtx.lineWidth = 4;
    roundRect(neighborCtx, 16, y - 106, 132, 52, 16, true, true);

    neighborCtx.fillStyle = "#3a1e0c";
    neighborCtx.font = "900 12px Arial";
    neighborCtx.textAlign = "center";
    wrapNeighborText(neighborDedPhrase, 82, y - 83, 116, 14);
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

function drawNeighborHouse(x, y, stage) {
    neighborCtx.save();
    neighborCtx.translate(x, y);

    neighborCtx.fillStyle = "#5b3417";
    neighborCtx.fillRect(-42, 28, 84, 14);

    if (stage >= 1) {
        neighborCtx.fillStyle = "#d97706";
        neighborCtx.fillRect(-36, -8, 72, 42);
    }

    if (stage >= 2) {
        neighborCtx.fillStyle = "#7c2d12";
        neighborCtx.beginPath();
        neighborCtx.moveTo(-46, -8);
        neighborCtx.lineTo(0, -44);
        neighborCtx.lineTo(46, -8);
        neighborCtx.closePath();
        neighborCtx.fill();
    }

    if (stage >= 3) {
        neighborCtx.fillStyle = "#fde68a";
        neighborCtx.fillRect(-22, 6, 15, 15);
        neighborCtx.fillRect(10, 6, 15, 15);
    }

    if (stage >= 4) {
        neighborCtx.fillStyle = "#3a1e0c";
        neighborCtx.fillRect(-6, 10, 16, 24);
    }

    if (stage >= 5) {
        neighborCtx.font = "34px Arial";
        neighborCtx.textAlign = "center";
        neighborCtx.fillText("🏡", 0, -54);
    }

    neighborCtx.restore();
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
    neighborCtx.fillText(`Ряды: ${neighborTetris.lines}/12`, 30, height - 61);
    neighborCtx.fillText(`Уровень: ${neighborTetris.level}`, 30, height - 39);

    neighborCtx.textAlign = "right";
    neighborCtx.fillText(`Очки: ${neighborTetris.score}`, width - 30, height - 61);

    if (neighborNextPiece) {
        neighborCtx.fillText(`Дальше: ${neighborNextPiece.icon}`, width - 30, height - 39);
    }

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
            subtitle.textContent = `Ряды: ${neighborTetris.lines}. Очки: ${neighborTetris.score}. Дед построил дачу мечты.`;
        }
        return;
    }

    neighborGameOver.classList.remove("hidden");

    const subtitle = neighborGameOver.querySelector(".neighbor-subtitle");

    if (subtitle) {
        subtitle.textContent = `Очки: ${neighborTetris.score}. Рекорд: ${neighborBestDistance}. Дед задумался о втором сарае.`;
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