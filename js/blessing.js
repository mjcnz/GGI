import { player } from './player.js';

let blessing = { active: false, remainingTime: 0, timer: null };

function blessX(amount) {
  if (amount === 'all') amount = player.favor;
  else if (typeof amount !== 'number') {
    const input = document.getElementById("bless-amount").value;
    amount = parseInt(input);
  }
  if (isNaN(amount) || amount < 1 || player.favor < amount) {
    alert("Not enough Favor");
    return;
  }
  player.favor -= amount;
  updateFavorDisplay();
  const extraTime = amount * 60;
  blessing.remainingTime += extraTime;
  if (!blessing.active) startBlessingTimer();
  updateBlessingStatus();
}

function startBlessingTimer() {
  blessing.active = true;
  blessing.timer = setInterval(() => {
    blessing.remainingTime--;
    if (blessing.remainingTime <= 0) {
      clearInterval(blessing.timer);
      blessing.active = false;
      blessing.remainingTime = 0;
    }
    updateBlessingStatus();
  }, 1000);
}

function updateBlessingStatus() {
  const status = document.getElementById("blessing-status");
  if (blessing.active) {
    const min = Math.floor(blessing.remainingTime / 60);
    const sec = blessing.remainingTime % 60;
    status.textContent = `Blessed! (${min}m ${sec}s left)`;
  } else {
    status.textContent = "Not blessed";
  }
}

function updateFavorDisplay() {
  document.getElementById("current-favor").textContent = player.favor;
}

function isBlessed() { return blessing.active; }

function getBlessingModifiers() {
  return blessing.active
    ? { xpMultiplier: 1.05, doubleLogBonus: 0.02 }
    : { xpMultiplier: 1.0, doubleLogBonus: 0 };
}

export {
  blessX,
  isBlessed,
  getBlessingModifiers,
  updateFavorDisplay
};