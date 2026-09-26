// === СОСТОЯНИЕ ===
var coins = 0;
var coinsPerClick = 1;
var totalEarned = 0;
var totalTaps = 0;
var crystals = 0;
var prestigeCount = 0;
var goldenMultiplier = 1;
var goldenTimer = 0;
var unlocked = {};

// === НАСТРОЙКИ ===
var settings = {
  showFloat: true,
  showGolden: true,
  showDaily: true,
  sound: false
};

// === СКИНЫ ===
var SKIN_PRICE = 5;

var skins = {
  gold:    { name: "Золотистый", bg: "radial-gradient(circle at 30% 30%, #fff59d, #f9a825)", owned: true  },
  blue:    { name: "Синий",      bg: "radial-gradient(circle at 30% 30%, #90caf9, #1565c0)", owned: false },
  green:   { name: "Зелёный",    bg: "radial-gradient(circle at 30% 30%, #a5d6a7, #2e7d32)", owned: false },
  diamond: { name: "Алмазный",   bg: "radial-gradient(circle at 30% 30%, #e1f5fe, #0277bd)", owned: false },
  ruby:    { name: "Рубиновый",  bg: "radial-gradient(circle at 30% 30%, #ff8a80, #b71c1c)", owned: false },
  power:   { name: "Power",      image: "images/power.png",                                  owned: false }
};

var activeSkin = "gold";

// === УЛУЧШЕНИЯ ===
var upgrades = {
  clicker:     { name: "👆 Кликер",          desc: "+1 монета за тап",       cost: 10,             baseCost: 10,             count: 0, effect: "click", amount: 1 },
  farm:        { name: "🌾 Ферма",           desc: "+1 монета в секунду",    cost: 50,             baseCost: 50,             count: 0, effect: "auto",  amount: 1 },
  factory:     { name: "🏭 Фабрика",         desc: "+10 монет в секунду",    cost: 500,            baseCost: 500,            count: 0, effect: "auto",  amount: 10 },
  bank:        { name: "🏦 Банк",            desc: "+100 монет в секунду",   cost: 5000,           baseCost: 5000,           count: 0, effect: "auto",  amount: 100 },
  server:      { name: "🖥️ Серверная",       desc: "+1000 монет в секунду",  cost: 50000,          baseCost: 50000,          count: 0, effect: "auto",  amount: 1000 },
  lab:         { name: "🔬 Лаборатория",     desc: "+10000 монет в секунду", cost: 500000,         baseCost: 500000,         count: 0, effect: "auto",  amount: 10000 },
  space:       { name: "🚀 Космостанция",    desc: "+100K монет в секунду",  cost: 5000000,        baseCost: 5000000,        count: 0, effect: "auto",  amount: 100000 },
  quantum:     { name: "⚛️ Квантовый комп",  desc: "+1M монет в секунду",    cost: 50000000,       baseCost: 50000000,       count: 0, effect: "auto",  amount: 1000000 },
  portal:      { name: "🌀 Портал",          desc: "+10M монет в секунду",   cost: 500000000,      baseCost: 500000000,      count: 0, effect: "auto",  amount: 10000000 },
  galaxy:      { name: "🌌 Галактика",       desc: "+100M монет в секунду",  cost: 5000000000,     baseCost: 5000000000,     count: 0, effect: "auto",  amount: 100000000 },
  universe:    { name: "🌠 Вселенная",       desc: "+1B монет в секунду",    cost: 50000000000,    baseCost: 50000000000,    count: 0, effect: "auto",  amount: 1000000000 },
  multiverse:  { name: "♾️ Мультивселенная", desc: "+10B монет в секунду",   cost: 500000000000,   baseCost: 500000000000,   count: 0, effect: "auto",  amount: 10000000000 },
  singularity: { name: "🕳️ Сингулярность",   desc: "+100B монет в секунду",  cost: 5000000000000,  baseCost: 5000000000000,  count: 0, effect: "auto",  amount: 100000000000 },
  godmode:     { name: "👁️ Око Творца",      desc: "+1T монет в секунду",    cost: 50000000000000, baseCost: 50000000000000, count: 0, effect: "auto",  amount: 1000000000000 },
  infinity:    { name: "💫 Бесконечность",   desc: "+10T монет в секунду",   cost: 500000000000000,baseCost: 500000000000000,count: 0, effect: "auto",  amount: 10000000000000 }
};

// === ДОСТИЖЕНИЯ ===
var achievements = [
  { id: "tap_1",      icon: "👆", title: "Первый тап",        desc: "Сделайте 1 тап",              check: function() { return totalTaps >= 1; } },
  { id: "tap_100",    icon: "💪", title: "100 тапов",         desc: "Сделайте 100 тапов",          check: function() { return totalTaps >= 100; } },
  { id: "tap_1000",   icon: "🔥", title: "Тысяча тапов",      desc: "Сделайте 1000 тапов",         check: function() { return totalTaps >= 1000; } },
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
  { id: "cps_100",    icon: "⚡", title: "Электростанция",    desc: "100 монет в секунду",         check: function() { return getCPS() >= 100; } },
  { id: "cps_10k",    icon: "🌩️", title: "Гроза",             desc: "10K монет в секунду",         check: function() { return getCPS() >= 10000; } },
  { id: "cps_1m",     icon: "🌪️", title: "Ураган",            desc: "1M монет в секунду",          check: function() { return getCPS() >= 1000000; } },
  { id: "prestige_1", icon: "💜", title: "Перерождение",      desc: "Переродитесь один раз",       check: function() { return prestigeCount >= 1; } }
];

// === СОХРАНЕНИЕ ===
var SAVE_KEY = "clicker-save";

function saveGame() {
  var data = {
    coins: coins,
    coinsPerClick: coinsPerClick,
    totalEarned: totalEarned,
    totalTaps: totalTaps,
    crystals: crystals,
    prestigeCount: prestigeCount,
    unlocked: unlocked,
    lastTime: Date.now(),
    upgrades: {}
  };
  for (var id in upgrades) {
    data.upgrades[id] = { cost: upgrades[id].cost, count: upgrades[id].count };
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
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
    prestigeCount = data.prestigeCount || 0;

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

    checkDailyBonus();
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
      settings.sound = data.sound === true;
    } catch (e) {}
  }
  var el1 = document.getElementById("opt-float");
  var el2 = document.getElementById("opt-golden");
  var el3 = document.getElementById("opt-daily");
  var el4 = document.getElementById("opt-sound");
  if (el1) el1.checked = settings.showFloat;
  if (el2) el2.checked = settings.showGolden;
  if (el3) el3.checked = settings.showDaily;
  if (el4) el4.checked = settings.sound;
}

function saveSettings() {
  localStorage.setItem("clicker-settings", JSON.stringify(settings));
}

// === ЗВУКИ ===
var sounds = {};

function initSounds() {
  var names = ["click", "buy", "achievement", "prestige", "golden"];
  names.forEach(function(n) {
    try {
      sounds[n] = new Audio("sounds/" + n + ".mp3");
      sounds[n].volume = 0.4;
    } catch (e) {}
  });
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

// === СКИНЫ (функции) ===
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
    // Скин-картинка
    btn.style.background = "url('" + skin.image + "') center / cover no-repeat";
    btn.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.4)";
  } else {
    // Скин-градиент
    btn.style.background = skin.bg;
    btn.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.4)";
  }
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

    var priceText = "";
    if (activeSkin === id) {
      priceText = '<div class="skin-price">✓ Выбран</div>';
    } else if (skin.owned) {
      priceText = '<div class="skin-price">Нажмите</div>';
    } else {
      priceText = '<div class="skin-price">' + SKIN_PRICE + ' 💎</div>';
    }

    var previewStyle;
var previewText;
if (skin.image) {
  previewStyle = "background:url('" + skin.image + "') center / cover no-repeat;";
  previewText = "";
} else {
  previewStyle = "background:" + skin.bg + ";";
  previewText = "ТАП";
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

      playSound("buy");
      saveSkins();
      applySkin();
      renderSkins();
      updateUI();
      saveGame();
    };
  });
}

// === ЕЖЕДНЕВНЫЙ БОНУС ===
function checkDailyBonus() {
  if (!settings.showDaily) return;
  var last = localStorage.getItem("lastDaily");
  var streak = parseInt(localStorage.getItem("dailyStreak") || "0");
  var now = Date.now();
  var oneDay = 24 * 60 * 60 * 1000;

  if (!last || now - parseInt(last) >= oneDay) {
    if (last && now - parseInt(last) > 2 * oneDay) {
      streak = 0;
    }

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

// === ФОРМАТ ЧИСЕЛ ===
function formatNumber(n) {
  n = Math.floor(n);
  if (n < 1000) return n.toString();
  if (n < 1000000) return (n / 1000).toFixed(1) + "K";
  if (n < 1000000000) return (n / 1000000).toFixed(2) + "M";
  if (n < 1000000000000) return (n / 1000000000).toFixed(2) + "B";
  if (n < 1000000000000000) return (n / 1000000000000).toFixed(2) + "T";
  return (n / 1000000000000000).toFixed(2) + "Qa";
}

// === РАСЧЁТЫ ===
function getCrystalBonus() {
  return 1 + crystals * 0.1;
}

function getCPS() {
  var cps = 0;
  for (var id in upgrades) {
    if (upgrades[id].effect === "auto") {
      cps += upgrades[id].count * upgrades[id].amount;
    }
  }
  return cps * getCrystalBonus() * goldenMultiplier;
}

function getClickValue() {
  var base = coinsPerClick + getCPS() * 0.05;
  return base * getCrystalBonus() * goldenMultiplier;
}

function getPrestigeGain() {
  return Math.floor(Math.sqrt(totalEarned / 1000000000));
}

// === ПРЕСТИЖ ===
function doPrestige() {
  var gain = getPrestigeGain();
  if (gain <= 0) return;
  if (!confirm("Переродиться за " + gain + " 💎?\nВесь прогресс сбросится, но кристаллы дадут +" + (gain * 10) + "% к доходу навсегда.")) return;

  playSound("prestige");
  crystals += gain;
  prestigeCount++;
  coins = 0;
  coinsPerClick = 1;
  totalEarned = 0;
  totalTaps = 0;

  for (var id in upgrades) {
    upgrades[id].count = 0;
    upgrades[id].cost = upgrades[id].baseCost;
  }

  updateUI();
  checkAchievements();
  saveGame();
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

    playSound("golden");
    coin.remove();
    updateUI();
    saveGame();
  };

  document.body.appendChild(coin);

  setTimeout(function() {
    if (coin.parentNode) coin.remove();
  }, 8000);
}

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
        playSound("buy");
        updateUI();
        checkAchievements();
        saveGame();
      }
    };
  });
}

// === ИНТЕРФЕЙС ===
function updateUI() {
  document.getElementById("coins").textContent = formatNumber(coins);
  document.getElementById("cps").textContent = formatNumber(getCPS() / (goldenMultiplier || 1)) + (goldenMultiplier > 1 ? " (x7!)" : "");
  document.getElementById("total").textContent = formatNumber(totalEarned);
  document.getElementById("crystals").textContent = crystals;
  document.getElementById("crystal-bonus").textContent = "+" + Math.round(crystals * 10) + "%";
  document.getElementById("prestige-gain").textContent = getPrestigeGain();
  document.getElementById("prestige-btn").disabled = getPrestigeGain() <= 0;

  for (var id in upgrades) {
    var up = upgrades[id];
    var owned = document.getElementById("owned-" + id);
    var cost = document.getElementById("cost-" + id);
    if (owned) owned.textContent = up.count;
    if (cost) cost.textContent = formatNumber(up.cost);
    var btn = document.querySelector('.buy[data-id="' + id + '"]');
    if (btn) btn.disabled = coins < up.cost;
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
  document.getElementById("stat-prestige").textContent = prestigeCount;

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
  totalTaps++;

  var rect = e.target.getBoundingClientRect();
  var x = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
  var y = rect.top + rect.height / 2;
  showFloatPlus(x, y, value);

  playSound("click");
  updateUI();
  checkAchievements();
  saveGame();
};

// === ПРЕСТИЖ ===
document.getElementById("prestige-btn").onclick = doPrestige;

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

setInterval(updateChestButton, 1000);

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
    var tab = btn.dataset.tab;
    var modal = document.getElementById("modal-" + tab);
    if (modal) {
      if (tab === "stats") updateStats();
      if (tab === "skins") renderSkins();
      modal.classList.remove("hidden");
    }
  };
});

document.querySelectorAll(".modal-close").forEach(function(btn) {
  btn.onclick = function() {
    var id = btn.dataset.close;
    var el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  };
});

document.querySelectorAll(".modal").forEach(function(modal) {
  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  };
});

// === ГАЛОЧКИ НАСТРОЕК ===
var optFloat = document.getElementById("opt-float");
var optGolden = document.getElementById("opt-golden");
var optDaily = document.getElementById("opt-daily");
var optSound = document.getElementById("opt-sound");
if (optFloat) optFloat.onchange = function() { settings.showFloat = this.checked; saveSettings(); };
if (optGolden) optGolden.onchange = function() { settings.showGolden = this.checked; saveSettings(); };
if (optDaily) optDaily.onchange = function() { settings.showDaily = this.checked; saveSettings(); };
if (optSound) optSound.onchange = function() { settings.sound = this.checked; saveSettings(); };

// === КНОПКА СБРОСА (двойной тап) ===
var settingsReset = document.getElementById("settings-reset");
var resetArmed = false;
var resetTimer = null;

if (settingsReset) {
  settingsReset.onclick = function() {
    if (!resetArmed) {
      // Первый тап — предупреждаем
      resetArmed = true;
      settingsReset.textContent = "⚠️ Нажмите ещё раз, чтобы сбросить!";
      settingsReset.style.background = "#ff5722";

      // Через 3 секунды возвращаем как было
      resetTimer = setTimeout(function() {
        resetArmed = false;
        settingsReset.textContent = "Сбросить весь прогресс";
        settingsReset.style.background = "#b33a3a";
      }, 3000);
      return;
    }

    // Второй тап — сбрасываем
    clearTimeout(resetTimer);

    try {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem("lastDaily");
      localStorage.removeItem("dailyStreak");
      localStorage.removeItem("clicker-settings");
      localStorage.removeItem("clicker-skins");
      localStorage.removeItem("lastChest");
      localStorage.clear(); // на всякий случай чистим всё
    } catch (e) {
      alert("Ошибка очистки: " + e.message);
    }

    // Сообщаем и перезагружаем
    alert("Прогресс сброшен! Сейчас страница перезагрузится.");
    location.reload();
  };
}

// === ЦИКЛЫ ===
setInterval(function() {
  var income = getCPS();
  coins += income;
  totalEarned += income;
  updateUI();
  checkAchievements();
}, 1000);

setInterval(saveGame, 5000);
window.addEventListener("beforeunload", saveGame);

// === СТАРТ ===
initSounds();
loadSettings();
loadSkins();
loadGame();
renderShop();
applySkin();
updateUI();
renderAchievements();
updateChestButton();
checkAchievements();