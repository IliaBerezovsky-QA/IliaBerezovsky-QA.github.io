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
    if (!flappyCanvas) return;

    resizeFlappyCanvas();

    const rect = flappyMode.getBoundingClientRect();

    flappyRunning = true;
    flappyBirdY = rect.height / 2;
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
    const rect = flappyMode.getBoundingClientRect();
    const gap = Math.max(158, Math.min(188, rect.height * 0.24));
    const minTop = 86;
    const maxTop = Math.max(minTop + 20, rect.height - gap - 118);
    const topHeight = random(minTop, maxTop);

    flappyPipes.push({
        x: rect.width + 40,
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

    flappyPipes = flappyPipes.filter((pipe) => pipe.x + pipe.width > -60);
}

function drawFlappyIntro() {
    if (!flappyCtx || !flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    drawFlappyBackground(rect.width, rect.height);

    flappyCtx.font = "46px Arial";
    flappyCtx.fillText("🐦", 68, rect.height / 2);
}

function drawFlappyGame() {
    if (!flappyCtx || !flappyMode) return;

    const rect = flappyMode.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    drawFlappyBackground(width, height);

    flappyPipes.forEach((pipe) => {
        drawFlappyObstacle(pipe.x, 0, pipe.width, pipe.topHeight);
        drawFlappyObstacle(pipe.x, pipe.topHeight + pipe.gap, pipe.width, height - pipe.topHeight - pipe.gap);
    });

    flappyCtx.save();
    flappyCtx.font = "44px Arial";
    flappyCtx.translate(78, flappyBirdY);
    flappyCtx.rotate(Math.max(-0.35, Math.min(0.45, flappyVelocity / 14)));
    flappyCtx.fillText("🐦", -22, 16);
    flappyCtx.restore();

    flappyCtx.font = "24px Arial";
    flappyCtx.fillText("🌱", 18, height - 26);
    flappyCtx.fillText("🌻", width - 56, height - 34);
}

function drawFlappyBackground(width, height) {
    const skyGradient = flappyCtx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, "#8fd8f7");
    skyGradient.addColorStop(0.58, "#93e2ff");
    skyGradient.addColorStop(1, "#65a30d");

    flappyCtx.fillStyle = skyGradient;
    flappyCtx.fillRect(0, 0, width, height);

    flappyCtx.fillStyle = "rgba(255,255,255,.8)";
    flappyCtx.beginPath();
    flappyCtx.arc(78, 108, 28, 0, Math.PI * 2);
    flappyCtx.arc(108, 104, 36, 0, Math.PI * 2);
    flappyCtx.arc(142, 110, 25, 0, Math.PI * 2);
    flappyCtx.fill();

    flappyCtx.beginPath();
    flappyCtx.arc(width - 120, 168, 24, 0, Math.PI * 2);
    flappyCtx.arc(width - 92, 164, 32, 0, Math.PI * 2);
    flappyCtx.arc(width - 60, 170, 23, 0, Math.PI * 2);
    flappyCtx.fill();

    flappyCtx.fillStyle = "rgba(91,52,23,.25)";
    flappyCtx.fillRect(0, height - 44, width, 44);
}

function drawFlappyObstacle(x, y, width, height) {
    if (height <= 0) return;

    const gradient = flappyCtx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "#7c3f18");
    gradient.addColorStop(0.45, "#5b3417");
    gradient.addColorStop(1, "#3a1e0c");

    flappyCtx.fillStyle = gradient;
    flappyCtx.fillRect(x, y, width, height);

    flappyCtx.fillStyle = "#3a1e0c";
    flappyCtx.fillRect(x - 7, y + height - 18, width + 14, 18);

    flappyCtx.fillStyle = "rgba(255,255,255,.16)";
    flappyCtx.fillRect(x + 10, y + 8, 9, Math.max(0, height - 16));

    flappyCtx.font = "28px Arial";

    for (let i = y + 44; i < y + height - 18; i += 58) {
        flappyCtx.fillText("🪚", x + 14, i);
    }
}

function checkFlappyCollision() {
    if (!flappyMode) return false;

    const rect = flappyMode.getBoundingClientRect();

    const birdX = 63;
    const birdY = flappyBirdY - 30;
    const birdWidth = 42;
    const birdHeight = 42;

    if (birdY < 0 || birdY + birdHeight > rect.height - 44) {
        return true;
    }

    return flappyPipes.some((pipe) => {
        const inPipeX =
            birdX + birdWidth > pipe.x &&
            birdX < pipe.x + pipe.width;

        const hitTop = birdY < pipe.topHeight;
        const hitBottom = birdY + birdHeight > pipe.topHeight + pipe.gap;

        return inPipeX && (hitTop || hitBottom);
    });
}

function endFlappyGame() {
    flappyRunning = false;
    cancelAnimationFrame(flappyAnimationId);

    flappyGameOver.classList.remove("hidden");

    const subtitle = flappyGameOver.querySelector(".flappy-subtitle");

    if (subtitle) {
        subtitle.textContent = `Уклонений: ${flappyScore}. Рекорд: ${flappyBestScore}. Лариса требует реванш.`;
    }
}

window.addEventListener("resize", () => {
    if (flappyMode && !flappyMode.classList.contains("hidden")) {
        resizeFlappyCanvas();

        if (!flappyRunning) {
            drawFlappyIntro();
        }
    }
});

updateUI();