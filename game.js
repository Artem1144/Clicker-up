// === СОСТОЯНИЕ ===
var coins = 0;
var coinsPerClick = 1;
var totalEarned = 0;
var totalTaps = 0;
var crystals = 0;
var goldenMultiplier = 1;
var goldenTimer = 0;
var unlocked = {};

var shards = 0;
var bloodMoonActive = false;
var bloodMoonTimer = 0;

var eventMultiplier = 1;
var eventTimer = 0;
var eventName = "";
var currentEventKey = "";

var usedPromos = {};
var logoClicks = 0;
var logoClickTimer = null;
var logoCooldown = 0;

var ownedItems = {};

var secretUnlocked = false;
var secretAutoClicker = false;
var secretClickerInterval = null;
var secretAutoClickerTimer = 0;

// === ВКЛАД ===
var depositUnlocked = false;
var depositLevel = 0;
var lastDepositDropTime = Date.now();

var DEPOSIT_LEVELS = [
  { level: 1,  cost: 1000000000000000,             emoji: "😭" },
  { level: 2,  cost: 5000000000000000,             emoji: "😢" },
  { level: 3,  cost: 15000000000000000,            emoji: "😟" },
  { level: 4,  cost: 50000000000000000,            emoji: "😐" },
  { level: 5,  cost: 100000000000000000,           emoji: "😕" },
  { level: 6,  cost: 250000000000000000,           emoji: "🙂" },
  { level: 7,  cost: 500000000000000000,           emoji: "😊" },
  { level: 8,  cost: 1000000000000000000,          emoji: "😄" },
  { level: 9,  cost: 5000000000000000000,          emoji: "😁" },
  { level: 10, cost: 15000000000000000000,         emoji: "😂" },
  { level: 11, cost: 50000000000000000000,         emoji: "🤣" },
  { level: 12, cost: 100000000000000000000,        emoji: "😎" },
  { level: 13, cost: 500000000000000000000,        emoji: "🥳" },
  { level: 14, cost: 1000000000000000000000,       emoji: "😍" },
  { level: 15, cost: 5000000000000000000000,       emoji: "🤩" },
  { level: 16, cost: 25000000000000000000000,      emoji: "😻" },
  { level: 17, cost: 100000000000000000000000,     emoji: "🥰" },
  { level: 18, cost: 500000000000000000000000,     emoji: "😘" },
  { level: 19, cost: 1000000000000000000000000,    emoji: "😇" },
  { level: 20, cost: 5000000000000000000000000,    emoji: "🤑" },
  { level: 21, cost: 25000000000000000000000000,   emoji: "👑" },
  { level: 22, cost: 100000000000000000000000000,  emoji: "🌟" },
  { level: 23, cost: 500000000000000000000000000,  emoji: "💫" },
  { level: 24, cost: 1000000000000000000000000000, emoji: "🌈" },
  { level: 25, cost: 5000000000000000000000000000, emoji: "✨" }
];

var DEPOSIT_DROP_INTERVAL = 30 * 60 * 1000;
var DEPOSIT_HUNGRY_RATE = 5000000;

// === #GULAU ===
var gulauActive = false;
var gulauTimer = 0;

// === БОСС-СМАЙЛИК ===
var bossActive = false;
var bossHP = 150;
var bossMaxHP = 150;
var bossTimeLeft = 45.0;
var bossTimerInterval = null;
var bossClickCooldown = 0;
var bossClickCount = 0;
var bossClickTimer = null;
var bossRewardClaimed = false;

// === ЗНАК ТРЕВОГИ ===
var alarmTimeout = null;
var alarmActive = false;
var alarmClicks = 0;
var alarmSound = null;
var ALARM_TIME = 5 * 60 * 1000;

// === НАГРАДА ЗА 228 ===
var rewardClaimed = false;
var rewardTabShown = false;

// === НАСТРОЙКИ ===
var settings = {
  showFloat: true,
  showGolden: true,
  showDaily: true,
  sound: true,
  music: false
};

// === СКИНЫ ===
var SKIN_PRICE = 5;

var skins = {
  gold:    { name: "Золотистый", bg: "radial-gradient(circle at 30% 30%, #fff59d, #f9a825)", owned: true  },
  blue:    { name: "Синий",      bg: "radial-gradient(circle at 30% 30%, #90caf9, #1565c0)", owned: false },
  green:   { name: "Зелёный",    bg: "radial-gradient(circle at 30% 30%, #a5d6a7, #2e7d32)", owned: false },
  diamond: { name: "Алмазный",   bg: "radial-gradient(circle at 30% 30%, #e1f5fe, #0277bd)", owned: false },
  ruby:    { name: "Рубиновый",  bg: "radial-gradient(circle at 30% 30%, #ff8a80, #b71c1c)", owned: false }
};

var activeSkin = "gold";

// === ПРЕДМЕТЫ ===
var ITEMS = {
  blade:  { icon: "🩸", name: "Кровавый клинок",  desc: "Оружие первых охотников",  cost: 5,   bonus: 0.05 },
  amulet: { icon: "🧿", name: "Амулет луны",      desc: "Оберег из чёрного камня",   cost: 10,  bonus: 0.10 },
  elixir: { icon: "⚗️", name: "Кровавый эликсир", desc: "Зелье из лунной росы",      cost: 20,  bonus: 0.15 },
  candle: { icon: "🕯️", name: "Свеча ритуала",    desc: "Горит вечно алым светом",   cost: 35,  bonus: 0.20 },
  skull:  { icon: "💀", name: "Череп врага",      desc: "Трофей с поля битвы",       cost: 55,  bonus: 0.25 },
  bat:    { icon: "🦇", name: "Летучая мышь",     desc: "Хранительница ночи",        cost: 80,  bonus: 0.30 },
  orb:    { icon: "🔮", name: "Тёмный шар",       desc: "Видит сквозь время",        cost: 120, bonus: 0.40 },
  scythe: { icon: "🗡️", name: "Серп луны",        desc: "Жнёт врагов как колосья",   cost: 180, bonus: 0.50 },
  wings:  { icon: "🦋", name: "Крылья вампира",   desc: "Дар ночной охоты",          cost: 250, bonus: 0.75 },
  crown:  { icon: "👑", name: "Венец луны",       desc: "Власть над Кровавой луной", cost: 500, bonus: 1.00 }
};

// === УЛУЧШЕНИЯ (18) ===
var upgrades = {
  clicker:     { name: "👆 Кликер",           desc: "+1 монета за тап",       cost: 10,                  baseCost: 10,                  count: 0, effect: "click", amount: 1 },
  farm:        { name: "🌾 Ферма",            desc: "+1 монета в секунду",    cost: 50,                  baseCost: 50,                  count: 0, effect: "auto",  amount: 1 },
  factory:     { name: "🏭 Фабрика",          desc: "+10 монет в секунду",    cost: 500,                 baseCost: 500,                 count: 0, effect: "auto",  amount: 10 },
  bank:        { name: "🏦 Банк",             desc: "+100 монет в секунду",   cost: 5000,                baseCost: 5000,                count: 0, effect: "auto",  amount: 100 },
  server:      { name: "🖥️ Серверная",        desc: "+1000 монет в секунду",  cost: 50000,               baseCost: 50000,               count: 0, effect: "auto",  amount: 1000 },
  lab:         { name: "🔬 Лаборатория",      desc: "+10000 монет в секунду", cost: 500000,              baseCost: 500000,              count: 0, effect: "auto",  amount: 10000 },
  space:       { name: "🚀 Космостанция",     desc: "+100K монет в секунду",  cost: 5000000,             baseCost: 5000000,             count: 0, effect: "auto",  amount: 100000 },
  quantum:     { name: "⚛️ Квантовый комп",   desc: "+1M монет в секунду",    cost: 50000000,            baseCost: 50000000,            count: 0, effect: "auto",  amount: 1000000 },
  portal:      { name: "🌀 Портал",           desc: "+10M монет в секунду",   cost: 500000000,           baseCost: 500000000,           count: 0, effect: "auto",  amount: 10000000 },
  galaxy:      { name: "🌌 Галактика",        desc: "+100M монет в секунду",  cost: 5000000000,          baseCost: 5000000000,          count: 0, effect: "auto",  amount: 100000000 },
  universe:    { name: "🌠 Вселенная",        desc: "+1B монет в секунду",    cost: 50000000000,         baseCost: 50000000000,         count: 0, effect: "auto",  amount: 1000000000 },
  multiverse:  { name: "♾️ Мультивселенная",  desc: "+10B монет в секунду",   cost: 500000000000,        baseCost: 500000000000,        count: 0, effect: "auto",  amount: 10000000000 },
  singularity: { name: "🕳️ Сингулярность",    desc: "+100B монет в секунду",  cost: 5000000000000,       baseCost: 5000000000000,       count: 0, effect: "auto",  amount: 100000000000 },
  godmode:     { name: "👁️ Око Творца",       desc: "+1T монет в секунду",    cost: 50000000000000,      baseCost: 50000000000000,      count: 0, effect: "auto",  amount: 1000000000000 },
  infinity:    { name: "💫 Бесконечность",    desc: "+10T монет в секунду",   cost: 500000000000000,     baseCost: 500000000000000,     count: 0, effect: "auto",  amount: 10000000000000 },
  timecrystal: { name: "🕰️ Кристалл времени", desc: "+100T монет в секунду",  cost: 5000000000000000,    baseCost: 5000000000000000,    count: 0, effect: "auto",  amount: 100000000000000 },
  blackhole:   { name: "🌑 Чёрная дыра",      desc: "+1Qa монет в секунду",   cost: 50000000000000000,   baseCost: 50000000000000000,   count: 0, effect: "auto",  amount: 1000000000000000 },
  omega:       { name: "♎ Омега",             desc: "+10Qa монет в секунду",  cost: 500000000000000000,  baseCost: 500000000000000000,  count: 0, effect: "auto",  amount: 10000000000000000 }
};

// === ДОСТИЖЕНИЯ (30) ===
var achievements = [
  { id: "tap_1",      icon: "👆", title: "Первый тап",        desc: "Сделайте 1 тап",              check: function() { return totalTaps >= 1; } },
  { id: "tap_100",    icon: "💪", title: "100 тапов",         desc: "Сделайте 100 тапов",          check: function() { return totalTaps >= 100; } },
  { id: "tap_1000",   icon: "🔥", title: "Тысяча тапов",      desc: "Сделайте 1000 тапов",         check: function() { return totalTaps >= 1000; } },
  { id: "tap_5k",     icon: "⚡", title: "5 000 тапов",        desc: "Сделайте 5 000 тапов",        check: function() { return totalTaps >= 5000; } },
  { id: "tap_10k",    icon: "🌟", title: "10 000 тапов",       desc: "Сделайте 10 000 тапов",       check: function() { return totalTaps >= 10000; } },
  { id: "tap_25k",    icon: "💫", title: "25 000 тапов",       desc: "Сделайте 25 000 тапов",       check: function() { return totalTaps >= 25000; } },
  { id: "tap_50k",    icon: "🌠", title: "50 000 тапов",       desc: "Сделайте 50 000 тапов",       check: function() { return totalTaps >= 50000; } },
  { id: "tap_100k",   icon: "👑", title: "100 000 тапов",      desc: "Сделайте 100 000 тапов",      check: function() { return totalTaps >= 100000; } },
  { id: "coins_100",  icon: "💰", title: "Сотня",             desc: "Накопите 100 монет",          check: function() { return coins >= 100; } },
  { id: "coins_1k",   icon: "💎", title: "Тысячник",          desc: "Накопите 1K монет",           check: function() { return coins >= 1000; } },
  { id: "coins_1m",   icon: "🏆", title: "Миллионер",         desc: "Накопите 1M монет",           check: function() { return coins >= 1000000; } },
  { id: "coins_1b",   icon: "👑", title: "Миллиардер",        desc: "Накопите 1B монет",           check: function() { return coins >= 1000000000; } },
  { id: "coins_1t",   icon: "🌟", title: "Триллионер",        desc: "Накопите 1T монет",           check: function() { return coins >= 1000000000000; } },
  { id: "earn_1m",    icon: "📈", title: "Первая прибыль",    desc: "Заработайте 1M за всё время", check: function() { return totalEarned >= 1000000; } },
  { id: "earn_1b",    icon: "💼", title: "Оборот",            desc: "Заработайте 1B за всё время", check: function() { return totalEarned >= 1000000000; } },
  { id: "first_up",   icon: "🔧", title: "Улучшатель",        desc: "Купите первое улучшение",     check: function() { return upgrades.clicker.count >= 1; } },
  { id: "farm_10",    icon: "🌾", title: "Фермер",            desc: "Купите 10 ферм",              check: function() { return upgrades.farm.count >= 10; } },
  { id: "factory_5",  icon: "🏭", title: "Промышленник",      desc: "Купите 5 фабрик",             check: function() { return upgrades.factory.count >= 5; } },
  { id: "bank_5",     icon: "🏦", title: "Банкир",            desc: "Купите 5 банков",             check: function() { return upgrades.bank.count >= 5; } },
  { id: "space_1",    icon: "🚀", title: "Космонавт",         desc: "Купите космостанцию",         check: function() { return upgrades.space.count >= 1; } },
  { id: "quantum_1",  icon: "⚛️", title: "Квантовый скачок",  desc: "Купите квантовый компьютер",  check: function() { return upgrades.quantum.count >= 1; } },
  { id: "portal_1",   icon: "🌀", title: "Портал открыт",     desc: "Купите портал",               check: function() { return upgrades.portal.count >= 1; } },
  { id: "galaxy_1",   icon: "🌌", title: "Владыка галактик",  desc: "Купите галактику",            check: function() { return upgrades.galaxy.count >= 1; } },
  { id: "universe_1", icon: "🌠", title: "Властелин миров",   desc: "Купите вселенную",            check: function() { return upgrades.universe.count >= 1; } },
  { id: "infinity_1", icon: "💫", title: "Бесконечность",     desc: "Купите бесконечность",        check: function() { return upgrades.infinity.count >= 1; } },
  { id: "timecrystal_1", icon: "🕰️", title: "Владыка времени", desc: "Купите Кристалл времени",    check: function() { return upgrades.timecrystal.count >= 1; } },
  { id: "blackhole_1", icon: "🌑", title: "Пожиратель",       desc: "Купите Чёрную дыру",          check: function() { return upgrades.blackhole.count >= 1; } },
  { id: "omega_1",    icon: "♎", title: "Омега",              desc: "Купите Омегу",                check: function() { return upgrades.omega.count >= 1; } },
  { id: "cps_100",    icon: "⚡", title: "Электростанция",    desc: "100 монет в секунду",         check: function() { return getCPS() >= 100; } },
  { id: "cps_10k",    icon: "🌩️", title: "Гроза",             desc: "10K монет в секунду",         check: function() { return getCPS() >= 10000; } },
  { id: "cps_1m",     icon: "🌪️", title: "Ураган",            desc: "1M монет в секунду",          check: function() { return getCPS() >= 1000000; } }
];

// === СОХРАНЕНИЕ ===
var SAVE_KEY = "clicker-save";

function saveGame() {
  if (window.__resetting) return;

  var data = {
    coins: coins,
    coinsPerClick: coinsPerClick,
    totalEarned: totalEarned,
    totalTaps: totalTaps,
    crystals: crystals,
    unlocked: unlocked,
    lastTime: Date.now(),
    shards: shards,
    eventMultiplier: eventMultiplier,
    eventTimer: eventTimer,
    eventName: eventName,
    currentEventKey: currentEventKey,
    usedPromos: usedPromos,
    ownedItems: ownedItems,
    secretUnlocked: secretUnlocked,
    secretAutoClicker: secretAutoClicker,
    secretAutoClickerTimer: secretAutoClickerTimer,
    depositUnlocked: depositUnlocked,
    depositLevel: depositLevel,
    lastDepositDropTime: lastDepositDropTime,
    gulauActive: gulauActive,
    gulauTimer: gulauTimer,
    rewardClaimed: rewardClaimed,
    bossRewardClaimed: bossRewardClaimed,
    upgrades: {}
  };
  for (var id in upgrades) {
    data.upgrades[id] = { cost: upgrades[id].cost, count: upgrades[id].count };
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));

  // Глобальный список использованных кодов — НЕ стирается при сбросе
  try {
    localStorage.setItem("clicker-used-promos", JSON.stringify(usedPromos));
  } catch (e) {}
}

function loadGame() {
  var raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;

  try {
    var data = JSON.parse(raw);
    coins = data.coins || 0;
    coinsPerClick = data.coinsPerClick || 1;
    totalEarned = data.totalEarned || 0;
    totalTaps = data.totalTaps || 0;
    crystals = data.crystals || 0;

    if (data.unlocked) {
      for (var u in data.unlocked) unlocked[u] = data.unlocked[u];
    }

    if (data.upgrades) {
      for (var id2 in data.upgrades) {
        if (upgrades[id2]) {
          upgrades[id2].cost = data.upgrades[id2].cost;
          upgrades[id2].count = data.upgrades[id2].count;
        }
      }
    }

    if (data.lastTime) {
      var secondsAway = Math.floor((Date.now() - data.lastTime) / 1000);
      var capped = Math.min(secondsAway, 8 * 3600);
      var earned = Math.floor(getCPS() * capped);
      if (earned > 0) {
        coins += earned;
        totalEarned += earned;
        document.getElementById("offline-amount").textContent = formatNumber(earned);
        document.getElementById("offline-popup").classList.remove("hidden");
        document.getElementById("offline-close").onclick = function() {
          document.getElementById("offline-popup").classList.add("hidden");
          saveGame();
        };
      }
    }

    shards = data.shards || 0;
    eventMultiplier = data.eventMultiplier || 1;
    eventTimer = data.eventTimer || 0;
    eventName = data.eventName || "";
    currentEventKey = data.currentEventKey || "";

    // Приоритет — глобальный список кодов (не стирается при сбросе)
    try {
      var globalPromos = localStorage.getItem("clicker-used-promos");
      if (globalPromos) {
        usedPromos = JSON.parse(globalPromos);
      } else if (data.usedPromos) {
        usedPromos = data.usedPromos;
      }
    } catch (e) {
      if (data.usedPromos) usedPromos = data.usedPromos;
    }

    if (data.ownedItems) ownedItems = data.ownedItems;

    secretUnlocked = data.secretUnlocked || false;
    secretAutoClicker = data.secretAutoClicker || false;
    secretAutoClickerTimer = data.secretAutoClickerTimer || 0;

    depositUnlocked = data.depositUnlocked || false;
    depositLevel = data.depositLevel || 0;
    lastDepositDropTime = Date.now();

    gulauActive = data.gulauActive || false;
    gulauTimer = data.gulauTimer || 0;

    rewardClaimed = data.rewardClaimed || false;
    bossRewardClaimed = data.bossRewardClaimed || false;

    if (gulauActive && gulauTimer > 0) {
      document.getElementById("gulau-info").style.display = "block";
      updateGulauTimer();
    }

    if (secretUnlocked && secretAutoClicker && secretAutoClickerTimer > 0) {
      setTimeout(function() {
        startSecretAutoClicker();
      }, 500);
    }

    checkDailyBonus();
    checkRewardTab();
    updateDepositSideButton();
  } catch (e) {
    console.warn("Ошибка загрузки:", e);
  }
}

// === НАСТРОЙКИ ===
function loadSettings() {
  var raw = localStorage.getItem("clicker-settings");
  if (raw) {
    try {
      var data = JSON.parse(raw);
      settings.showFloat = data.showFloat !== false;
      settings.showGolden = data.showGolden !== false;
      settings.showDaily = data.showDaily !== false;
      settings.sound = data.sound !== false;
      settings.music = data.music === true;
    } catch (e) {}
  }
  var el1 = document.getElementById("opt-float");
  var el2 = document.getElementById("opt-golden");
  var el3 = document.getElementById("opt-daily");
  var el4 = document.getElementById("opt-sound");
  var el5 = document.getElementById("opt-music");
  if (el1) el1.checked = settings.showFloat;
  if (el2) el2.checked = settings.showGolden;
  if (el3) el3.checked = settings.showDaily;
  if (el4) el4.checked = settings.sound;
  if (el5) el5.checked = settings.music;
}

function saveSettings() {
  localStorage.setItem("clicker-settings", JSON.stringify(settings));
}

// === ЗВУКИ ===
var sounds = {};
var bgMusic = null;

function initSounds() {
  var names = ["click", "ui", "achievement"];
  names.forEach(function(n) {
    try {
      sounds[n] = new Audio("sounds/" + n + ".mp3");
      sounds[n].volume = 0.4;
    } catch (e) {}
  });

  try {
    bgMusic = new Audio("sounds/music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.25;
  } catch (e) {}

  try {
    alarmSound = new Audio("sounds/alarm.mp3");
    alarmSound.loop = true;
    alarmSound.volume = 0.5;
  } catch (e) {}
}

function playSound(name) {
  if (!settings.sound) return;
  var snd = sounds[name];
  if (!snd) return;
  try {
    snd.currentTime = 0;
    snd.play();
  } catch (e) {}
}

function playMusic() {
  if (!bgMusic) return;
  if (!settings.music) return;
  try {
    bgMusic.play().catch(function() {});
  } catch (e) {}
}

function stopMusic() {
  if (!bgMusic) return;
  try {
    bgMusic.pause();
  } catch (e) {}
}

function unlockAudio() {
  for (var n in sounds) {
    try {
      var p = sounds[n].play();
      if (p && p.then) {
        p.then(function() {
          sounds[n].pause();
          sounds[n].currentTime = 0;
        }).catch(function() {});
      }
    } catch (e) {}
  }
  if (settings.music) {
    playMusic();
  }
  document.removeEventListener("touchstart", unlockAudio);
  document.removeEventListener("click", unlockAudio);
}

document.addEventListener("touchstart", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });

// === МУЗЫКА: СТОП ПРИ СВОРАЧИВАНИИ/ВЫХОДЕ ===
function handleVisibilityChange() {
  if (document.hidden) {
    stopMusic();
  } else {
    if (settings.music) {
      playMusic();
    }
  }
}

function handlePageHide() {
  stopMusic();
}

function handleWindowBlur() {
  stopMusic();
}

document.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("pagehide", handlePageHide);
window.addEventListener("blur", handleWindowBlur);
window.addEventListener("beforeunload", function() {
  stopMusic();
});

// === СКИНЫ ===
function loadSkins() {
  var raw = localStorage.getItem("clicker-skins");
  if (raw) {
    try {
      var data = JSON.parse(raw);
      if (data.owned) {
        for (var id in data.owned) {
          if (skins[id]) skins[id].owned = data.owned[id];
        }
      }
      if (data.active && skins[data.active]) activeSkin = data.active;
    } catch (e) {}
  }
}

function saveSkins() {
  var ownedData = {};
  for (var id in skins) {
    ownedData[id] = skins[id].owned;
  }
  localStorage.setItem("clicker-skins", JSON.stringify({
    owned: ownedData,
    active: activeSkin
  }));
}

function applySkin() {
  var btn = document.getElementById("click-btn");
  if (!btn) return;
  var skin = skins[activeSkin];
  if (skin.image) {
    btn.style.background = "url('" + skin.image + "') center / cover no-repeat";
  } else {
    btn.style.background = skin.bg;
  }
  btn.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.4)";
}

function renderSkins() {
  var list = document.getElementById("skins-list");
  if (!list) return;
  list.innerHTML = "";

  for (var id in skins) {
    var skin = skins[id];
    var div = document.createElement("div");
    var classes = "skin-item";
    if (activeSkin === id) classes += " active";
    if (!skin.owned) classes += " locked";
    div.className = classes;
    div.dataset.id = id;

    var previewStyle;
    var previewText;
    if (skin.image) {
      previewStyle = "background:url('" + skin.image + "') center / cover no-repeat;";
      previewText = "";
    } else {
      previewStyle = "background:" + skin.bg + ";";
      previewText = "ТАП";
    }

    var priceText = "";
    if (activeSkin === id) {
      priceText = '<div class="skin-price">✓ Выбран</div>';
    } else if (skin.owned) {
      priceText = '<div class="skin-price">Нажмите</div>';
    } else {
      priceText = '<div class="skin-price">' + SKIN_PRICE + ' 💎</div>';
    }

    div.innerHTML =
      '<div class="skin-preview" style="' + previewStyle + '">' + previewText + '</div>' +
      '<div class="skin-name">' + skin.name + '</div>' +
      priceText;

    list.appendChild(div);
  }

  document.querySelectorAll(".skin-item").forEach(function(el) {
    el.onclick = function() {
      var id = el.dataset.id;
      var skin = skins[id];

      if (skin.owned) {
        activeSkin = id;
        playSound("ui");
        saveSkins();
        applySkin();
        renderSkins();
        return;
      }

      if (crystals < SKIN_PRICE) {
        alert("Недостаточно кристаллов!\nНужно: " + SKIN_PRICE + " 💎\nУ вас: " + crystals + " 💎");
        return;
      }

      crystals -= SKIN_PRICE;
      skin.owned = true;
      activeSkin = id;
      playSound("ui");
      saveSkins();
      applySkin();
      renderSkins();
      updateUI();
      saveGame();
    };
  });
}

// === ПРЕДМЕТЫ ===
function getItemBonus() {
  var sum = 0;
  for (var id in ITEMS) {
    if (ownedItems[id]) sum += ITEMS[id].bonus;
  }
  return 1 + sum;
}

function renderItems() {
  var list = document.getElementById("items-list");
  var shardsEl = document.getElementById("items-shards");
  if (!list) return;

  if (shardsEl) shardsEl.textContent = shards;
  list.innerHTML = "";

  for (var id in ITEMS) {
    var item = ITEMS[id];
    var owned = !!ownedItems[id];
    var canBuy = shards >= item.cost;

    var div = document.createElement("div");
    div.className = "item-card" + (owned ? " owned" : "");
    div.innerHTML =
      '<div class="item-icon">' + item.icon + '</div>' +
      '<div class="item-info">' +
      '<div class="item-name">' + item.name + '</div>' +
      '<div class="item-desc">' + item.desc + '</div>' +
      '<div class="item-effect">+' + Math.round(item.bonus * 100) + '% к доходу</div>' +
      '</div>' +
      '<button class="item-buy' + (owned ? ' owned-btn' : '') + '" data-id="' + id + '"' +
      (owned ? '' : (canBuy ? '' : ' disabled')) + '>' +
      (owned ? '✓ Куплено' : item.cost + ' 🌑') +
      '</button>';

    list.appendChild(div);
  }

  document.querySelectorAll(".item-buy").forEach(function(btn) {
    btn.onclick = function() {
      var id = btn.dataset.id;
      var item = ITEMS[id];

      if (ownedItems[id]) return;

      if (shards < item.cost) {
        alert("Недостаточно осколков!\nНужно: " + item.cost + " 🌑\nУ вас: " + shards + " 🌑");
        return;
      }

      shards -= item.cost;
      ownedItems[id] = true;

      playSound("ui");
      renderItems();
      updateUI();
      saveGame();
    };
  });
}

// === ВКЛАД ===
function getCurrentDepositEmoji() {
  if (!depositUnlocked || depositLevel < 1) return "❓";
  var lvl = DEPOSIT_LEVELS[depositLevel - 1];
  return lvl ? lvl.emoji : "❓";
}

function updateDepositSideButton() {
  var btn = document.getElementById("deposit-side-btn");
  if (!btn) return;

  btn.classList.remove("lvl-hungry", "lvl-mid", "lvl-happy", "lvl-max");

  if (!depositUnlocked) {
    btn.textContent = "❓";
    return;
  }

  btn.textContent = getCurrentDepositEmoji();

  if (depositLevel <= 5) {
    btn.classList.add("lvl-hungry");
  } else if (depositLevel <= 15) {
    btn.classList.add("lvl-mid");
  } else if (depositLevel < 25) {
    btn.classList.add("lvl-happy");
  } else {
    btn.classList.add("lvl-max");
  }
}

function renderDeposit() {
  var content = document.getElementById("deposit-content");
  if (!content) return;

  if (!depositUnlocked) {
    content.innerHTML =
      '<div class="deposit-emoji">❓</div>' +
      '<div class="deposit-desc">Купите вклад за <b>1 Qa</b> монет, чтобы открыть смайлика.</div>' +
      '<div class="deposit-desc" style="color:#aaa;font-size:13px;">Смайлик будет расти с каждым вложением.</div>' +
      '<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Купить вклад за 1 Qa</button>';

    var btn = document.getElementById("deposit-buy-btn");
    if (btn) {
      btn.disabled = coins < DEPOSIT_LEVELS[0].cost;
      btn.onclick = function() {
        if (coins < DEPOSIT_LEVELS[0].cost) return;
        coins -= DEPOSIT_LEVELS[0].cost;
        depositUnlocked = true;
        depositLevel = 1;
        lastDepositDropTime = Date.now();
        playSound("ui");
        renderDeposit();
        updateDepositSideButton();
        updateUI();
        saveGame();
      };
    }
    return;
  }

  var emoji = getCurrentDepositEmoji();
  var isHungry = depositLevel <= 5;
  var isMax = depositLevel >= 25;

  var html = '<div class="deposit-emoji' + (isHungry ? ' hungry' : '') + '" id="deposit-emoji-el">' + emoji + '</div>';
  html += '<div class="deposit-level">Уровень ' + depositLevel + ' / 25</div>';

  if (isHungry) {
    html += '<div class="deposit-warning">😭 Голодный! Ест 5M монет в секунду</div>';
  } else if (isMax) {
    html += '<div class="deposit-happy">✨ Полный вклад! Смайлик сыт и доволен.</div>';
  } else {
    html += '<div class="deposit-happy">Смайлик доволен</div>';
  }

  if (!isMax) {
    var nextCost = DEPOSIT_LEVELS[depositLevel].cost;
    html += '<div class="deposit-desc">Следующий уровень: <b>' + formatNumber(nextCost) + '</b> монет</div>';
    html += '<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Вложить ' + formatNumber(nextCost) + '</button>';
  } else {
    html += '<div class="deposit-desc" style="color:#4caf50;">Достигнут максимум!</div>';
  }

  content.innerHTML = html;

  var btn2 = document.getElementById("deposit-buy-btn");
  if (btn2) {
    var need = DEPOSIT_LEVELS[depositLevel].cost;
    btn2.disabled = coins < need;
    btn2.onclick = function() {
      if (coins < need) return;
      coins -= need;
      depositLevel++;
      lastDepositDropTime = Date.now();
      playSound("ui");
      renderDeposit();
      updateDepositSideButton();
      updateUI();
      saveGame();
    };
  }

  var emojiEl = document.getElementById("deposit-emoji-el");
  if (emojiEl) {
    emojiEl.style.cursor = "pointer";
    emojiEl.onclick = bossEmojiClick;
  }
}

function updateDepositHunger() {
  if (!depositUnlocked) {
    var hi = document.getElementById("hungry-info");
    if (hi) hi.style.display = "none";
    return;
  }

  if (document.hidden) return;

  if (depositLevel <= 5) {
    var hi2 = document.getElementById("hungry-info");
    if (hi2) hi2.style.display = "block";

    var eaten = Math.min(coins, DEPOSIT_HUNGRY_RATE);
    if (eaten > 0) {
      coins -= eaten;
    }
  } else {
    var hi3 = document.getElementById("hungry-info");
    if (hi3) hi3.style.display = "none";
  }
}

function checkDepositDrop() {
  if (!depositUnlocked) return;
  if (document.hidden) return;

  var now = Date.now();
  if (now - lastDepositDropTime < DEPOSIT_DROP_INTERVAL) return;

  lastDepositDropTime = now;

  var drop = Math.random() < 0.5 ? 1 : 3;
  depositLevel = Math.max(1, depositLevel - drop);

  var modal = document.getElementById("modal-deposit");
  if (modal && !modal.classList.contains("hidden")) {
    renderDeposit();
  }
  updateDepositSideButton();

  saveGame();
}

// === БОСС-СМАЙЛИК ===
function setupBossSecret() {
  var emoji = document.getElementById("boss-emoji");
  if (emoji) {
    emoji.onclick = function() {
      if (!bossActive) return;
      if (bossClickCooldown > 0) return;
      bossClickCooldown = 0.05;
      bossHP--;
      if (bossHP < 0) bossHP = 0;
      updateBossUI();
      emoji.classList.remove("hurt");
      void emoji.offsetWidth;
      emoji.classList.add("hurt");
      if (bossHP <= 0) {
        winBoss();
      }
    };
  }

  var startBtn = document.getElementById("boss-start");
  if (startBtn) {
    startBtn.onclick = function() {
      startBoss();
    };
  }
}

function startBoss() {
  bossActive = true;
  bossHP = bossMaxHP;
  bossTimeLeft = 45.0;
  document.getElementById("boss-result").textContent = "";
  document.getElementById("boss-result").className = "";
  document.getElementById("boss-start").style.display = "none";
  updateBossUI();

  if (bossTimerInterval) clearInterval(bossTimerInterval);
  bossTimerInterval = setInterval(function() {
    if (!bossActive) return;
    bossTimeLeft -= 0.05;
    bossClickCooldown -= 0.05;
    if (bossClickCooldown < 0) bossClickCooldown = 0;
    if (bossTimeLeft <= 0) {
      bossTimeLeft = 0;
      loseBoss();
    }
    updateBossUI();
  }, 50);
}

function updateBossUI() {
  var fill = document.getElementById("boss-hp-fill");
  var text = document.getElementById("boss-hp-text");
  var timer = document.getElementById("boss-timer");
  if (fill) fill.style.width = (bossHP / bossMaxHP * 100) + "%";
  if (text) text.textContent = bossHP + " / " + bossMaxHP;
  if (timer) timer.textContent = "⏱ " + bossTimeLeft.toFixed(1) + " с";
}

function winBoss() {
  bossActive = false;
  if (bossTimerInterval) {
    clearInterval(bossTimerInterval);
    bossTimerInterval = null;
  }

  var res = document.getElementById("boss-result");
  if (!bossRewardClaimed) {
    bossRewardClaimed = true;
    shards += 25;
    if (res) {
      res.textContent = "🏆 Победа! +25 🌑 кровавых осколков!";
      res.className = "win";
    }
  } else {
    if (res) {
      res.textContent = "🏆 Победа! (награда уже получена ранее)";
      res.className = "win";
    }
  }

  document.getElementById("boss-start").style.display = "block";
  document.getElementById("boss-start").textContent = "🔁 Ещё раз";
  playSound("achievement");
  updateUI();
  saveGame();
}

function loseBoss() {
  bossActive = false;
  if (bossTimerInterval) {
    clearInterval(bossTimerInterval);
    bossTimerInterval = null;
  }

  var penalty = 10000000000000000000;
  var lost = Math.min(coins, penalty);
  coins -= lost;

  var res = document.getElementById("boss-result");
  if (res) {
    res.textContent = "💀 Провал! −" + formatNumber(lost) + " монет.";
    res.className = "lose";
  }
  document.getElementById("boss-start").style.display = "block";
  document.getElementById("boss-start").textContent = "🔁 Попробовать снова";
  playSound("ui");
  updateUI();
  saveGame();
}

function bossEmojiClick() {
  bossClickCount++;
  if (bossClickTimer) clearTimeout(bossClickTimer);
  bossClickTimer = setTimeout(function() {
    bossClickCount = 0;
  }, 1500);

  if (bossClickCount >= 3) {
    bossClickCount = 0;
    openBossModal();
  }
}

function openBossModal() {
  var modal = document.getElementById("modal-boss");
  if (!modal) return;

  var depositModal = document.getElementById("modal-deposit");
  if (depositModal) depositModal.classList.add("hidden");

  bossActive = false;
  bossHP = bossMaxHP;
  bossTimeLeft = 45.0;
  document.getElementById("boss-result").textContent = "";
  document.getElementById("boss-result").className = "";
  document.getElementById("boss-start").style.display = "block";
  document.getElementById("boss-start").textContent = "🔥 Начать бой";
  updateBossUI();

  modal.classList.remove("hidden");
}

// === ЗНАК ТРЕВОГИ ===
function resetAlarmTimer() {
  if (alarmTimeout) clearTimeout(alarmTimeout);
  alarmTimeout = setTimeout(triggerAlarm, ALARM_TIME);
}

function triggerAlarm() {
  if (alarmActive) return;
  alarmActive = true;
  alarmClicks = 0;
  updateAlarmCounter();

  var overlay = document.getElementById("alarm-overlay");
  if (overlay) overlay.classList.remove("hidden");

  if (alarmSound && settings.sound) {
    try {
      alarmSound.currentTime = 0;
      alarmSound.play().catch(function() {});
    } catch (e) {}
  }
}

function stopAlarm() {
  alarmActive = false;
  var overlay = document.getElementById("alarm-overlay");
  if (overlay) overlay.classList.add("hidden");

  if (alarmSound) {
    try {
      alarmSound.pause();
      alarmSound.currentTime = 0;
    } catch (e) {}
  }

  resetAlarmTimer();
}

function updateAlarmCounter() {
  var c = document.getElementById("alarm-counter");
  if (c) c.textContent = alarmClicks + " / 5";
}

function setupAlarm() {
  var overlay = document.getElementById("alarm-overlay");
  if (!overlay) return;

  overlay.onclick = function() {
    if (!alarmActive) return;
    alarmClicks++;
    updateAlarmCounter();
    playSound("ui");

    if (alarmClicks >= 5) {
      stopAlarm();
    }
  };

  resetAlarmTimer();
}

// === НАГРАДА ЗА 228 КЛИКЕРОВ ===
function checkRewardTab() {
  var tab = document.getElementById("tab-reward");

  if (!tab) return;

  if (rewardClaimed) {
    tab.classList.add("hidden");
    return;
  }

  if (upgrades.clicker.count >= 228) {
    if (!rewardTabShown) {
      tab.classList.remove("hidden");
      rewardTabShown = true;

      var popup = document.createElement("div");
      popup.className = "achievement-popup";
      popup.textContent = "🏅 Ты прокачал Кликер до 228! Открой вкладку «Награда»!";
      document.body.appendChild(popup);
      setTimeout(function() { popup.remove(); }, 5000);

      playSound("achievement");
    }
  } else {
    tab.classList.add("hidden");
    rewardTabShown = false;
  }
}

function claimReward() {
  if (rewardClaimed) return;

  shards += 25;
  rewardClaimed = true;

  var res = document.getElementById("reward-result");
  if (res) {
    res.textContent = "🎉 Ты получил +25 🌑 кровавых осколков!";
    res.style.color = "#4caf50";
  }

  var btn = document.getElementById("reward-claim");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "✅ Получено";
  }

  playSound("achievement");
  updateUI();
  saveGame();

  setTimeout(function() {
    var tab = document.getElementById("tab-reward");
    if (tab) tab.classList.add("hidden");

    var modal = document.getElementById("modal-reward");
    if (modal) modal.classList.add("hidden");
  }, 2000);
}

// === #GULAU ===
function startGulau() {
  gulauActive = true;
  gulauTimer = 15 * 60;
  document.getElementById("gulau-info").style.display = "block";
  updateGulauTimer();
}

function updateGulauTimer() {
  var el = document.getElementById("gulau-timer");
  if (el && gulauActive) {
    var m = Math.floor(gulauTimer / 60);
    var s = gulauTimer % 60;
    el.textContent = m + ":" + (s < 10 ? "0" : "") + s;
  }
}

function endGulau() {
  gulauActive = false;
  gulauTimer = 0;
  document.getElementById("gulau-info").style.display = "none";
}

// === ЭКСПОРТ / ИМПОРТ ===
function exportSave() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      alert("Нет сохранения для экспорта.");
      return;
    }

    var data = JSON.parse(raw);
    data.exportDate = Date.now();

    var json = JSON.stringify(data);
    var encoded = btoa(unescape(encodeURIComponent(json)));

    var box = document.getElementById("export-box");
    var text = document.getElementById("export-text");
    if (box && text) {
      text.value = encoded;
      box.classList.remove("hidden");
    }
  } catch (e) {
    alert("Ошибка экспорта: " + e.message);
  }
}

function copyExport() {
  var text = document.getElementById("export-text");
  if (!text) return;
  text.select();
  text.setSelectionRange(0, 999999);

  try {
    document.execCommand("copy");
    alert("✅ Скопировано!");
  } catch (e) {
    try {
      navigator.clipboard.writeText(text.value);
      alert("✅ Скопировано!");
    } catch (err) {
      alert("Не удалось скопировать. Выделите текст и скопируйте вручную.");
    }
  }
}

function importSave() {
  var text = document.getElementById("import-text");
  var result = document.getElementById("import-result");
  if (!text || !result) return;

  var code = text.value.trim();
  result.className = "";

  if (!code) {
    result.textContent = "Вставьте код сохранения.";
    result.classList.add("error");
    return;
  }

  try {
    var json = decodeURIComponent(escape(atob(code)));
    var data = JSON.parse(json);

    if (!data || typeof data.coins === "undefined") {
      throw new Error("Неверный формат");
    }

    if (!confirm("⚠️ Текущий прогресс будет заменён.\nПродолжить?")) {
      return;
    }

    window.__resetting = true;
    localStorage.setItem(SAVE_KEY, json);
    result.textContent = "✅ Прогресс загружен! Перезагрузка...";
    result.classList.add("success");

    setTimeout(function() {
      location.reload();
    }, 800);
  } catch (e) {
    result.textContent = "❌ Ошибка: " + e.message;
    result.classList.add("error");
  }
}

// === ЕЖЕДНЕВНЫЙ БОНУС ===
function checkDailyBonus() {
  if (!settings.showDaily) return;
  var last = localStorage.getItem("lastDaily");
  var streak = parseInt(localStorage.getItem("dailyStreak") || "0");
  var now = Date.now();
  var oneDay = 24 * 60 * 60 * 1000;

  if (!last || now - parseInt(last) >= oneDay) {
    if (last && now - parseInt(last) > 2 * oneDay) streak = 0;
    streak += 1;
    var bonus = Math.max(100, Math.floor(getCPS() * 60));
    coins += bonus;
    totalEarned += bonus;
    var text = "🎁 Ежедневный бонус (день " + streak + "): " + formatNumber(bonus) + " монет!";
    if (streak % 7 === 0) {
      crystals += 5;
      text += "\n💎 +5 кристаллов за серию 7 дней!";
    }
    localStorage.setItem("lastDaily", now.toString());
    localStorage.setItem("dailyStreak", streak.toString());
    setTimeout(function() {
      alert(text);
      updateUI();
    }, 500);
  }
}

// === МИНИ-ИВЕНТЫ ===
var EVENTS = {
  rain:   { name: "💰 Монетный дождь",         mult: 1.5, duration: 180, color: "#4caf50" },
  storm:  { name: "⚡ Молниеносный потенциал", mult: 1.8, duration: 120, color: "#ffc107" },
  fast:   { name: "🏃 Быстрый способ",         mult: 1.3, duration: 300, color: "#2196f3" },
  income: { name: "💵 Заработок",              mult: 1.2, duration: 240, color: "#9c27b0" }
};

var lastEventKey = localStorage.getItem("lastEventKey") || "";

function getQuarterKey() {
  var d = new Date();
  var q = Math.floor(d.getMinutes() / 15) * 15;
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getHours() + "-" + q;
}

function startRandomEvent() {
  var keys = Object.keys(EVENTS);
  var key = keys[Math.floor(Math.random() * keys.length)];
  var ev = EVENTS[key];
  currentEventKey = key;
  eventMultiplier = ev.mult;
  eventTimer = ev.duration;
  eventName = ev.name;

  var banner = document.getElementById("event-banner");
  if (banner) {
    banner.textContent = ev.name + " x" + ev.mult;
    banner.style.background = "linear-gradient(135deg, " + ev.color + ", #000)";
    banner.classList.remove("hidden");
  }
  playSound("ui");
  updateUI();
  saveGame();
}

function endEvent() {
  eventTimer = 0;
  eventMultiplier = 1;
  eventName = "";
  currentEventKey = "";
  var banner = document.getElementById("event-banner");
  if (banner) banner.classList.add("hidden");
  updateUI();
  saveGame();
}

function updateEvent() {
  var now = new Date();
  var mins = now.getMinutes();
  var secs = now.getSeconds();
  var currentKey = getQuarterKey();

  var isStartOfQuarter = (mins % 15 === 0) && (secs < 5);

  if (isStartOfQuarter && lastEventKey !== currentKey) {
    lastEventKey = currentKey;
    localStorage.setItem("lastEventKey", lastEventKey);
    startRandomEvent();
    return;
  }

  if (eventTimer > 0) {
    eventTimer--;
    if (eventTimer <= 0) {
      endEvent();
      return;
    }
    var banner = document.getElementById("event-banner");
    if (banner) {
      var ev = EVENTS[currentEventKey];
      if (ev) {
        var m = Math.floor(eventTimer / 60);
        var s = eventTimer % 60;
        banner.textContent = ev.name + " x" + ev.mult + " — " + m + ":" + (s < 10 ? "0" : "") + s;
      }
    }
  }
}

// === КРОВАВАЯ ЛУНА ===
function isBloodMoonTime() {
  var d = new Date();
  var mins = d.getMinutes();
  var h = d.getHours();
  return (h % 3 === 0) && (mins < 30);
}

function startBloodMoon() {
  bloodMoonActive = true;
  var d = new Date();
  var mins = d.getMinutes();
  var secs = d.getSeconds();
  bloodMoonTimer = (30 - mins) * 60 - secs;

  document.body.classList.add("blood-moon");
  document.getElementById("blood-info").style.display = "block";

  var banner = document.createElement("div");
  banner.className = "blood-banner";
  banner.innerHTML = "🌕 КРОВАВАЯ ЛУНА 🌕<br>Доход x2!";
  banner.id = "blood-banner";
  document.body.appendChild(banner);
  setTimeout(function() {
    var b = document.getElementById("blood-banner");
    if (b) b.remove();
  }, 5000);

  playSound("ui");
  updateUI();
}

function endBloodMoon() {
  bloodMoonActive = false;
  bloodMoonTimer = 0;
  document.body.classList.remove("blood-moon");
  document.getElementById("blood-info").style.display = "none";
  var b = document.getElementById("blood-banner");
  if (b) b.remove();
}

function updateBloodMoon() {
  var inTime = isBloodMoonTime();

  if (inTime && !bloodMoonActive) {
    startBloodMoon();
  }

  if (!inTime && bloodMoonActive) {
    endBloodMoon();
  }

  if (bloodMoonActive) {
    var d = new Date();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    bloodMoonTimer = (30 - mins) * 60 - secs;

    var timerEl = document.getElementById("blood-timer");
    if (timerEl) {
      var m = Math.floor(bloodMoonTimer / 60);
      var s = bloodMoonTimer % 60;
      timerEl.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    }
  }
}

// === ПОДАРОЧНЫЕ КОДЫ ===
var PROMOS = {
  "BLOOD":    { reward: function() { shards += 10; return "🌑 +10 кровавых осколков!"; } },
  "CRYSTAL":  { reward: function() { crystals += 20; return "💎 +20 кристаллов!"; } },
  "GOLD2024": { reward: function() { coins += 100000; totalEarned += 100000; return "💰 +100 000 монет!"; } },
  "SECRET":   { reward: function() { skins.ruby.owned = true; saveSkins(); return "🔴 Открыт скин «Рубиновый»!"; } },
  "ARTEM":    { reward: function() { crystals += 50; shards += 5; return "💎 +50 кристаллов и 🌑 +5 осколков!"; } },
  "#GULAU":   { reward: function() { startGulau(); return "🔥 #Gulau активирован! ×5 тапов на 15 минут!"; } }
};

function activatePromo() {
  var input = document.getElementById("promo-input");
  var result = document.getElementById("promo-result");
  if (!input || !result) return;

  var code = input.value.trim().toUpperCase();
  result.className = "";

  if (!code) {
    result.textContent = "Введите код.";
    result.classList.add("error");
    return;
  }
  if (usedPromos[code]) {
    result.textContent = "Этот код уже использован.";
    result.classList.add("error");
    return;
  }
  if (!PROMOS[code]) {
    result.textContent = "Неверный код.";
    result.classList.add("error");
    return;
  }

  var text = PROMOS[code].reward();
  usedPromos[code] = true;
  result.textContent = text;
  result.classList.add("success");
  input.value = "";
  playSound("achievement");
  updateUI();
  renderSkins();
  saveGame();
}

// === ПАСХАЛКА НА ЛОГОТИПЕ ===
function setupLogoSecret() {
  var logo = document.getElementById("logo");
  if (!logo) return;

  logo.onclick = function() {
    if (Date.now() < logoCooldown) return;
    logoClicks++;

    if (logoClickTimer) clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(function() { logoClicks = 0; }, 1500);

    if (logoClicks >= 7) {
      logoClicks = 0;
      logoCooldown = Date.now() + 10 * 60 * 1000;
      shards += 5;
      crystals += 1;

      logo.style.transition = "transform 0.3s, color 0.3s";
      logo.style.transform = "scale(1.2)";
      logo.style.color = "#ff1744";
      setTimeout(function() {
        logo.style.transform = "scale(1)";
        logo.style.color = "";
      }, 400);

      var popup = document.createElement("div");
      popup.className = "achievement-popup";
      popup.textContent = "🌑 Секрет активирован! +5 осколков, +1 кристалл";
      document.body.appendChild(popup);
      setTimeout(function() { popup.remove(); }, 3000);

      playSound("achievement");
      updateUI();
      saveGame();
    }
  };
}

// === СЕКРЕТНОЕ МЕНЮ ===
var SECRET_TAPS_NEEDED = 6767;
var SECRET_ACTIVATION_COST = 67000000000000000000;

function setupAdvancedButton() {
  var btn = document.getElementById("advanced-btn");
  if (!btn) return;

  btn.onclick = function() {
    var sure = confirm("⚠️ Уверены, что хотите это видеть?");
    if (!sure) return;

    var reallySure = confirm("⚠️⚠️ Точно?");
    if (!reallySure) return;

    openSecretMenu();
  };
}

function openSecretMenu() {
  var modal = document.getElementById("modal-secret");
  if (!modal) return;

  var settings = document.getElementById("modal-settings");
  if (settings) settings.classList.add("hidden");

  updateSecretUI();
  modal.classList.remove("hidden");
}

function updateSecretUI() {
  var locked = document.getElementById("secret-locked");
  var unlockedEl = document.getElementById("secret-unlocked");
  var tapsEl = document.getElementById("secret-taps");
  var progressEl = document.getElementById("secret-progress");
  var toggleBtn = document.getElementById("secret-toggle");
  var statusEl = document.getElementById("secret-status");

  if (!locked || !unlockedEl) return;

  if (secretUnlocked) {
    locked.style.display = "none";
    unlockedEl.style.display = "block";

    if (secretAutoClicker) {
      toggleBtn.textContent = "🔥 Активировать ещё (67 Qa)";
      toggleBtn.classList.remove("secret-on");
      toggleBtn.classList.add("secret-off");
      toggleBtn.disabled = true;
      var m = Math.floor(secretAutoClickerTimer / 60);
      var s = secretAutoClickerTimer % 60;
      statusEl.textContent = "🔥 Автокликер активен — 67 кликов/сек. Осталось: " + m + ":" + (s < 10 ? "0" : "") + s;
      statusEl.style.color = "#4caf50";
    } else {
      toggleBtn.textContent = "🔥 Активировать (67 Qa)";
      toggleBtn.classList.remove("secret-off");
      toggleBtn.classList.add("secret-on");
      toggleBtn.disabled = coins < SECRET_ACTIVATION_COST;
      statusEl.textContent = "Разблокирован. Активация: 67 Qa за 30 минут.";
      statusEl.style.color = "#aaa";
    }
  } else {
    locked.style.display = "block";
    unlockedEl.style.display = "none";

    if (tapsEl) tapsEl.textContent = formatNumber(totalTaps);

    var percent = Math.min(100, (totalTaps / SECRET_TAPS_NEEDED) * 100);
    if (progressEl) progressEl.style.width = percent + "%";
  }
}

function tryUnlockSecret() {
  if (secretUnlocked) return;

  if (totalTaps < SECRET_TAPS_NEEDED) {
    var left = SECRET_TAPS_NEEDED - totalTaps;
    alert("❌ Ещё рано!\nНужно сделать " + formatNumber(SECRET_TAPS_NEEDED) + " тапов.\nОсталось: " + formatNumber(left));
    return;
  }

  secretUnlocked = true;
  playSound("achievement");

  var popup = document.createElement("div");
  popup.className = "achievement-popup";
  popup.textContent = "🔥 Кликер 67 разблокирован!";
  document.body.appendChild(popup);
  setTimeout(function() { popup.remove(); }, 4000);

  updateSecretUI();
  saveGame();
}

function activateSecretAutoClicker() {
  if (!secretUnlocked) return;
  if (secretAutoClicker) return;

  if (coins < SECRET_ACTIVATION_COST) {
    alert("❌ Недостаточно монет!\nНужно: 67 Qa\nУ вас: " + formatNumber(coins));
    return;
  }

  coins -= SECRET_ACTIVATION_COST;
  secretAutoClicker = true;
  secretAutoClickerTimer = 30 * 60;

  startSecretAutoClicker();
  playSound("achievement");
  updateSecretUI();
  updateUI();
  saveGame();
}

function startSecretAutoClicker() {
  if (secretClickerInterval) return;

  secretClickerInterval = setInterval(function() {
    var value = getClickValue();
    var add = value * 2;
    coins += add;
    totalEarned += add;
    var tapsToAdd = gulauActive ? 10 : 2;
    totalTaps += tapsToAdd;

    if (bloodMoonActive && Math.random() < 0.02) {
      shards += 1;
    }

    updateUI();
    checkAchievements();
  }, 30);
}

function stopSecretAutoClicker() {
  if (secretClickerInterval) {
    clearInterval(secretClickerInterval);
    secretClickerInterval = null;
  }
  secretAutoClicker = false;
  secretAutoClickerTimer = 0;
}

// === ФОРМАТ ЧИСЕЛ ===
function formatNumber(n) {
  n = Math.floor(n);
  if (n < 1000) return n.toString();
  if (n < 1000000) return (n / 1000).toFixed(1) + "K";
  if (n < 1000000000) return (n / 1000000).toFixed(2) + "M";
  if (n < 1000000000000) return (n / 1000000000).toFixed(2) + "B";
  if (n < 1000000000000000) return (n / 1000000000000).toFixed(2) + "T";
  if (n < 1000000000000000000) return (n / 1000000000000000).toFixed(2) + "Qa";
  if (n < 1000000000000000000000) return (n / 1000000000000000000).toFixed(2) + "Qi";
  if (n < 1000000000000000000000000) return (n / 1000000000000000000000).toFixed(2) + "Sx";
  if (n < 1000000000000000000000000000) return (n / 1000000000000000000000000).toFixed(2) + "Sp";
  if (n < 1000000000000000000000000000000) return (n / 1000000000000000000000000000).toFixed(2) + "Oc";
  if (n < 1000000000000000000000000000000000) return (n / 1000000000000000000000000000000).toFixed(2) + "No";
  if (n < 1000000000000000000000000000000000000) return (n / 1000000000000000000000000000000000).toFixed(2) + "Dc";
  return n.toExponential(2);
}

// === РАСЧЁТЫ ===
function getCPS() {
  var cps = 0;
  for (var id in upgrades) {
    if (upgrades[id].effect === "auto") {
      cps += upgrades[id].count * upgrades[id].amount;
    }
  }
  var moonBonus = bloodMoonActive ? 2 : 1;
  return cps * goldenMultiplier * moonBonus * eventMultiplier * getItemBonus();
}

function getClickValue() {
  var base = coinsPerClick + getCPS() * 0.05;
  var moonBonus = bloodMoonActive ? 2 : 1;
  return base * goldenMultiplier * moonBonus * eventMultiplier * getItemBonus();
}

// === ЗОЛОТАЯ МОНЕТКА ===
function spawnGoldenCoin() {
  if (!settings.showGolden) return;
  if (document.getElementById("golden-coin")) return;

  var coin = document.createElement("div");
  coin.id = "golden-coin";
  coin.textContent = "🪙";
  coin.style.left = Math.random() * (window.innerWidth - 80) + "px";
  coin.style.top = Math.random() * (window.innerHeight - 80) + "px";

  coin.onclick = function() {
    goldenMultiplier = 7;
    goldenTimer = 30;
    var text = "🌟 x7 доход на 30 секунд!";
    if (Math.random() < 0.2) {
      crystals += 1;
      text = "🌟 x7 доход + 💎 1 кристалл!";
    }
    var banner = document.createElement("div");
    banner.id = "golden-bonus";
    banner.textContent = text;
    document.body.appendChild(banner);
    playSound("ui");
    coin.remove();
    updateUI();
    saveGame();
  };

  document.body.appendChild(coin);

  setTimeout(function() {
    if (coin.parentNode) coin.remove();
  }, 8000);
}

// === ВСПЛЫВАЮЩЕЕ +N ===
function showFloatPlus(x, y, amount) {
  if (!settings.showFloat) return;
  var el = document.createElement("div");
  el.className = "float-plus";
  el.textContent = "+" + formatNumber(amount);
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 800);
}

function showShardDrop(x, y) {
  var el = document.createElement("div");
  el.className = "shard-drop";
  el.textContent = "🌑 +1 осколок!";
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 1500);
}

// === ДОСТИЖЕНИЯ ===
function renderAchievements() {
  var list = document.getElementById("achievements-list");
  if (!list) return;
  list.innerHTML = "";
  achievements.forEach(function(a) {
    var div = document.createElement("div");
    div.className = "achievement" + (unlocked[a.id] ? " unlocked" : "");
    div.innerHTML =
      '<div class="icon">' + a.icon + '</div>' +
      '<div class="info">' +
      '<div class="title">' + a.title + '</div>' +
      '<div class="desc">' + a.desc + '</div>' +
      '</div>';
    list.appendChild(div);
  });
}

function checkAchievements() {
  achievements.forEach(function(a) {
    if (!unlocked[a.id] && a.check()) {
      unlocked[a.id] = true;
      crystals += 1;
      showAchievementPopup(a);
      saveGame();
    }
  });
  renderAchievements();
}

function showAchievementPopup(a) {
  var popup = document.createElement("div");
  popup.className = "achievement-popup";
  popup.textContent = a.icon + " " + a.title + " (+1 💎)";
  document.body.appendChild(popup);
  playSound("achievement");
  setTimeout(function() { popup.remove(); }, 2500);
}

// === МАГАЗИН ===
function renderShop() {
  var list = document.getElementById("shop-list");
  if (!list) return;
  list.innerHTML = "";

  for (var id in upgrades) {
    var up = upgrades[id];
    var div = document.createElement("div");
    div.className = "item";
    div.innerHTML =
      '<div class="info">' +
      '<div class="name">' + up.name + '</div>' +
      '<div class="desc">' + up.desc + '</div>' +
      '</div>' +
      '<div class="right">' +
      '<div class="owned">Куплено: <span id="owned-' + id + '">0</span></div>' +
      '<button class="buy" data-id="' + id + '">Купить: <span id="cost-' + id + '">' + up.cost + '</span></button>' +
      '</div>';
    list.appendChild(div);
  }

  document.querySelectorAll(".buy").forEach(function(btn) {
    btn.onclick = function() {
      var id = btn.dataset.id;
      var up = upgrades[id];
      if (coins >= up.cost) {
        coins -= up.cost;
        up.count++;
        up.cost = Math.floor(up.baseCost * Math.pow(1.15, up.count));
        if (up.effect === "click") coinsPerClick += up.amount;
        playSound("ui");
        updateUI();
        checkAchievements();
        checkRewardTab();
        saveGame();
      }
    };
  });
}

// === ИНТЕРФЕЙС ===
function updateUI() {
  document.getElementById("coins").textContent = formatNumber(coins);
  document.getElementById("cps").textContent = formatNumber(getCPS()) + (goldenMultiplier > 1 ? " (x7!)" : "");
  document.getElementById("crystals").textContent = crystals;

  var shardsEl = document.getElementById("shards");
  if (shardsEl) shardsEl.textContent = shards;

  var ib = document.getElementById("item-bonus");
  if (ib) ib.textContent = "+" + Math.round((getItemBonus() - 1) * 100) + "%";

  for (var id in upgrades) {
    var up = upgrades[id];
    var owned = document.getElementById("owned-" + id);
    var cost = document.getElementById("cost-" + id);
    if (owned) owned.textContent = up.count;
    if (cost) cost.textContent = formatNumber(up.cost);
    var btn = document.querySelector('.buy[data-id="' + id + '"]');
    if (btn) btn.disabled = coins < up.cost;
  }

  var secretModal = document.getElementById("modal-secret");
  if (secretModal && !secretModal.classList.contains("hidden")) {
    updateSecretUI();
  }

  var depositModal = document.getElementById("modal-deposit");
  if (depositModal && !depositModal.classList.contains("hidden")) {
    renderDeposit();
  }
}

// === СТАТИСТИКА ===
function updateStats() {
  document.getElementById("stat-coins").textContent = formatNumber(coins);
  document.getElementById("stat-earned").textContent = formatNumber(totalEarned);
  document.getElementById("stat-taps").textContent = formatNumber(totalTaps);
  document.getElementById("stat-cps").textContent = formatNumber(getCPS());
  document.getElementById("stat-per-click").textContent = formatNumber(getClickValue());
  document.getElementById("stat-crystals").textContent = crystals;
  var statShards = document.getElementById("stat-shards");
  if (statShards) statShards.textContent = shards;

  var achCount = 0;
  for (var id in unlocked) {
    if (unlocked[id]) achCount++;
  }
  document.getElementById("stat-ach").textContent = achCount;
}

// === ТАП ===
document.getElementById("click-btn").onclick = function(e) {
  var value = getClickValue();
  coins += value;
  totalEarned += value;

  var tapsToAdd = gulauActive ? 5 : 1;
  totalTaps += tapsToAdd;

  var rect = e.target.getBoundingClientRect();
  var x = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
  var y = rect.top + rect.height / 2;
  showFloatPlus(x, y, value);

  if (bloodMoonActive && Math.random() < 0.01) {
    shards += 1;
    showShardDrop(x, y);
  }

  playSound("click");
  updateUI();
  checkAchievements();

  resetAlarmTimer();

  saveGame();
};

// === КНОПКА ВКЛАДА СБОКУ ===
var depositSideBtn = document.getElementById("deposit-side-btn");
if (depositSideBtn) {
  depositSideBtn.onclick = function() {
    playSound("ui");
    renderDeposit();
    document.getElementById("modal-deposit").classList.remove("hidden");
    updateDepositSideButton();
  };
}

// === СУНДУК ===
var CHEST_COOLDOWN = 60 * 60 * 1000;

function updateChestButton() {
  var btn = document.getElementById("chest-btn");
  if (!btn) return;

  var last = parseInt(localStorage.getItem("lastChest") || "0");
  var left = CHEST_COOLDOWN - (Date.now() - last);

  if (left <= 0) {
    btn.disabled = false;
    btn.textContent = "🎁 Открыть сундук";
  } else {
    btn.disabled = true;
    var mins = Math.floor(left / 60000);
    var secs = Math.floor((left % 60000) / 1000);
    btn.textContent = "🎁 Через " + mins + "м " + secs + "с";
  }
}

var chestBtn = document.getElementById("chest-btn");
if (chestBtn) {
  chestBtn.onclick = function() {
    var last = parseInt(localStorage.getItem("lastChest") || "0");
    if (Date.now() - last < CHEST_COOLDOWN) return;

    var crystalsReward = 1 + Math.floor(Math.random() * 3);
    var coinsReward = Math.max(500, Math.floor(getCPS() * 300));
    crystals += crystalsReward;
    coins += coinsReward;
    totalEarned += coinsReward;

    localStorage.setItem("lastChest", Date.now().toString());
    alert("🎁 Вы открыли сундук!\n💎 +" + crystalsReward + " кристаллов\n💰 +" + formatNumber(coinsReward) + " монет");
    playSound("achievement");
    updateUI();
    updateChestButton();
    saveGame();
  };
}

// === ВКЛАДКИ ===
document.querySelectorAll(".tab-btn").forEach(function(btn) {
  btn.onclick = function() {
    playSound("ui");
    var tab = btn.dataset.tab;
    var modal = document.getElementById("modal-" + tab);
    if (modal) {
      if (tab === "stats") updateStats();
      if (tab === "skins") renderSkins();
      if (tab === "achievements") renderAchievements();
      if (tab === "items") renderItems();
      modal.classList.remove("hidden");
    }
  };
});

document.querySelectorAll(".modal-close").forEach(function(btn) {
  btn.onclick = function() {
    playSound("ui");
    var id = btn.dataset.close;
    var el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  };
});

document.querySelectorAll(".modal").forEach(function(modal) {
  modal.onclick = function(e) {
    if (e.target === modal) modal.classList.add("hidden");
  };
});

// === ГАЛОЧКИ НАСТРОЕК ===
var optFloat = document.getElementById("opt-float");
var optGolden = document.getElementById("opt-golden");
var optDaily = document.getElementById("opt-daily");
var optSound = document.getElementById("opt-sound");
var optMusic = document.getElementById("opt-music");
if (optFloat) optFloat.onchange = function() { settings.showFloat = this.checked; saveSettings(); };
if (optGolden) optGolden.onchange = function() { settings.showGolden = this.checked; saveSettings(); };
if (optDaily) optDaily.onchange = function() { settings.showDaily = this.checked; saveSettings(); };
if (optSound) optSound.onchange = function() { settings.sound = this.checked; saveSettings(); };
if (optMusic) {
  optMusic.onchange = function() {
    settings.music = this.checked;
    saveSettings();
    if (settings.music) {
      playMusic();
    } else {
      stopMusic();
    }
  };
}

// === ПОЛЕ КОДА ===
var promoBtn = document.getElementById("promo-btn");
if (promoBtn) promoBtn.onclick = activatePromo;

var promoInput = document.getElementById("promo-input");
if (promoInput) {
  promoInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") activatePromo();
  });
}

// === ЭКСПОРТ/ИМПОРТ ===
var exportBtn = document.getElementById("export-btn");
if (exportBtn) exportBtn.onclick = exportSave;

var copyBtn = document.getElementById("copy-btn");
if (copyBtn) copyBtn.onclick = copyExport;

var exportClose = document.getElementById("export-close");
if (exportClose) {
  exportClose.onclick = function() {
    var box = document.getElementById("export-box");
    if (box) box.classList.add("hidden");
  };
}

var importBtn = document.getElementById("import-btn");
if (importBtn) {
  importBtn.onclick = function() {
    var box = document.getElementById("import-box");
    if (box) box.classList.toggle("hidden");
  };
}

var importLoad = document.getElementById("import-load");
if (importLoad) importLoad.onclick = importSave;

var importCancel = document.getElementById("import-cancel");
if (importCancel) {
  importCancel.onclick = function() {
    var box = document.getElementById("import-box");
    if (box) box.classList.add("hidden");
  };
}

// === НАГРАДА ===
var rewardClaimBtn = document.getElementById("reward-claim");
if (rewardClaimBtn) rewardClaimBtn.onclick = claimReward;

// === СЕКРЕТНОЕ МЕНЮ ===
var secretUnlockBtn = document.getElementById("secret-unlock");
if (secretUnlockBtn) secretUnlockBtn.onclick = tryUnlockSecret;

var secretToggleBtn = document.getElementById("secret-toggle");
if (secretToggleBtn) secretToggleBtn.onclick = activateSecretAutoClicker;

setupAdvancedButton();

// === КНОПКА СБРОСА ===
function setupResetButton() {
  var btn = document.getElementById("settings-reset");
  if (!btn) return;

  var step = 0;
  var timer = null;

  btn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();

    step++;

    if (step === 1) {
      btn.textContent = "⚠️ Нажмите ещё раз (1/2)";
      btn.style.background = "#ff5722";
      if (timer) clearTimeout(timer);
      timer = setTimeout(function() {
        step = 0;
        btn.textContent = "Сбросить весь прогресс";
        btn.style.background = "#b33a3a";
      }, 3000);
      return;
    }

    if (step === 2) {
      clearTimeout(timer);
      btn.textContent = "🗑️ Удаляю...";
      btn.style.background = "#8a0000";

      try {
        window.__resetting = true;

        coins = 0;
        coinsPerClick = 1;
        totalEarned = 0;
        totalTaps = 0;
        crystals = 0;
        goldenMultiplier = 1;
        goldenTimer = 0;
        shards = 0;
        bloodMoonActive = false;
        bloodMoonTimer = 0;
        eventMultiplier = 1;
        eventTimer = 0;
        eventName = "";
        currentEventKey = "";
        // usedPromos НЕ сбрасываем — коды остаются использованными навсегда
        unlocked = {};
        ownedItems = {};
        secretUnlocked = false;
        secretAutoClicker = false;
        secretAutoClickerTimer = 0;
        depositUnlocked = false;
        depositLevel = 0;
        gulauActive = false;
        gulauTimer = 0;
        bossActive = false;
        bossHP = 150;
        bossTimeLeft = 45;
        bossRewardClaimed = false;
        rewardClaimed = false;
        rewardTabShown = false;
        if (bossTimerInterval) {
          clearInterval(bossTimerInterval);
          bossTimerInterval = null;
        }
        stopSecretAutoClicker();

        for (var id in upgrades) {
          upgrades[id].count = 0;
          upgrades[id].cost = upgrades[id].baseCost;
        }

        for (var sid in skins) {
          skins[sid].owned = (sid === "gold");
        }
        activeSkin = "gold";

        try {
          localStorage.removeItem(SAVE_KEY);
          localStorage.removeItem("lastDaily");
          localStorage.removeItem("dailyStreak");
          localStorage.removeItem("clicker-settings");
          localStorage.removeItem("clicker-skins");
          localStorage.removeItem("lastChest");
          localStorage.removeItem("lastEventKey");
        } catch (err) {}

        setTimeout(function() {
          alert("✅ Прогресс полностью сброшен! Страница перезагрузится.");
          location.reload();
        }, 300);
      } catch (err) {
        alert("❌ Ошибка: " + err.message);
        btn.textContent = "Сбросить весь прогресс";
        btn.style.background = "#b33a3a";
        step = 0;
        window.__resetting = false;
      }
    }
  };
}

// === ЦИКЛЫ ===
setInterval(function() {
  var income = getCPS();
  coins += income;
  totalEarned += income;
  updateUI();
  checkAchievements();
  checkRewardTab();
}, 1000);

setInterval(updateEvent, 1000);
setInterval(updateBloodMoon, 1000);
setInterval(updateChestButton, 1000);
setInterval(updateDepositHunger, 1000);
setInterval(checkDepositDrop, 10000);
setInterval(function() {
  if (gulauActive) {
    gulauTimer--;
    if (gulauTimer <= 0) {
      endGulau();
    } else {
      updateGulauTimer();
    }
  }
}, 1000);
setInterval(function() {
  if (secretAutoClicker && secretAutoClickerTimer > 0) {
    secretAutoClickerTimer--;
    if (secretAutoClickerTimer <= 0) {
      secretAutoClickerTimer = 0;
      stopSecretAutoClicker();
      var popup = document.createElement("div");
      popup.className = "achievement-popup";
      popup.textContent = "⏸️ Кликер 67 остановлен. Можно активировать снова за 67 Qa.";
      document.body.appendChild(popup);
      setTimeout(function() { popup.remove(); }, 4000);
      updateSecretUI();
      saveGame();
    } else {
      var modal = document.getElementById("modal-secret");
      if (modal && !modal.classList.contains("hidden")) {
        updateSecretUI();
      }
    }
  }
}, 1000);
setInterval(saveGame, 5000);
window.addEventListener("beforeunload", saveGame);

setInterval(function() {
  if (Math.random() < 0.7) spawnGoldenCoin();
}, 60000);

setInterval(function() {
  if (goldenTimer > 0) {
    goldenTimer--;
    if (goldenTimer === 0) {
      goldenMultiplier = 1;
      var b = document.getElementById("golden-bonus");
      if (b) b.remove();
    }
  }
}, 1000);

// === СТАРТ ===
initSounds();
loadSettings();
loadSkins();
loadGame();
renderShop();
applySkin();
updateEvent();
updateBloodMoon();
updateUI();
renderAchievements();
updateChestButton();
checkAchievements();
setupLogoSecret();
setupResetButton();
setupBossSecret();
setupAlarm();
checkRewardTab();
updateDepositSideButton();

// === PWA: Service Worker ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("service-worker.js").catch(function(e) {
      console.warn("Service Worker не зарегистрирован:", e);
    });
  });
    }
