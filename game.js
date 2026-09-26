let coins = 0;
let coinsPerClick = 1;

const upgrades = {
  clicker: { cost: 10, baseCost: 10, count: 0, effect: "click", amount: 1 },
  farm: { cost: 50, baseCost: 50, count: 0, effect: "auto", amount: 1 },
  factory: { cost: 500, baseCost: 500, count: 0, effect: "auto", amount: 10 }
};

const SAVE_KEY = "clicker-save";

function saveGame() {
  const data = { coins: coins, coinsPerClick: coinsPerClick, upgrades: {} };
  for (const id in upgrades) {
    data.upgrades[id] = { cost: upgrades[id].cost, count: upgrades[id].count };
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  const data = JSON.parse(raw);
  coins = data.coins || 0;
  coinsPerClick = data.coinsPerClick || 1;
  if (data.upgrades) {
    for (const id in data.upgrades) {
      if (upgrades[id]) {
        upgrades[id].cost = data.upgrades[id].cost;
        upgrades[id].count = data.upgrades[id].count;
      }
    }
  }
}

function getCPS() {
  let cps = 0;
  for (const id in upgrades) {
    if (upgrades[id].effect === "auto") {
      cps += upgrades[id].count * upgrades[id].amount;
    }
  }
  return cps;
}

function updateUI() {
  document.getElementById("coins").textContent = Math.floor(coins);
  document.getElementById("cps").textContent = getCPS();
  for (const id in upgrades) {
    const up = upgrades[id];
    document.getElementById("owned-" + id).textContent = up.count;
    document.getElementById("cost-" + id).textContent = up.cost;
    const btn = document.querySelector('.buy[data-id="' + id + '"]');
    if (btn) btn.disabled = coins < up.cost;
  }
}

const resetBtn = document.createElement("button");
resetBtn.textContent = "СБРОСИТЬ ВСЁ";
resetBtn.style.cssText = "display:block;margin:30px auto;padding:15px 30px;background:#b33a3a;color:white;border:none;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;";
document.body.appendChild(resetBtn);

resetBtn.onclick = function() {
  localStorage.removeItem(SAVE_KEY);
  alert("Прогресс сброшен!");
  location.reload();
};

document.getElementById("click-btn").onclick = function() {
  coins += coinsPerClick;
  updateUI();
  saveGame();
};

document.querySelectorAll(".buy").forEach(function(btn) {
  btn.onclick = function() {
    const id = btn.dataset.id;
    const up = upgrades[id];
    if (coins >= up.cost) {
      coins -= up.cost;
      up.count = up.count + 1;
      up.cost = Math.floor(up.baseCost * Math.pow(1.15, up.count));
      if (up.effect === "click") {
        coinsPerClick = coinsPerClick + up.amount;
      }
      updateUI();
      saveGame();
    }
  };
});

setInterval(function() {
  coins = coins + getCPS();
  updateUI();
}, 1000);

setInterval(saveGame, 5000);

loadGame();
updateUI();