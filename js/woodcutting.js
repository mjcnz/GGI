import { player } from './player.js';
import { AxeSystem } from './axe.js';
import { getBlessingModifiers } from './blessing.js';

const trees = [
  { name: "Olive Tree", levelReq: 1, xp: 10, chopTime: 2, baseChance: 50, maxChance: 95 },
  { name: "Fig Tree", levelReq: 10, xp: 10.5, chopTime: 2, baseChance: 50, maxChance: 95 },
  { name: "Pomegranate Tree", levelReq: 25, xp: 20, chopTime: 3, baseChance: 50, maxChance: 90 }
];

function getEffectiveXP(baseXP, playerLevel, levelReq) {
  const penaltyRange = 15;
  const minMultiplier = 0.25;
  const overLevel = playerLevel - (levelReq + 15);
  const penalty = 1 - (overLevel / penaltyRange);
  return baseXP * Math.max(penalty, minMultiplier);
}

function chopTree(tree) {
  const axe = AxeSystem.getCurrentAxe();
  const bless = getBlessingModifiers();

  const effectiveXP = getEffectiveXP(tree.xp, player.woodcuttingLevel, tree.levelReq);
  const xp = effectiveXP * axe.xpMultiplier * bless.xpMultiplier;
  const totalDoubleChance = axe.doubleLogChance + bless.doubleLogBonus;
  const chopTime = tree.chopTime * 1000;

  setTimeout(() => {
    const chance = Math.min((player.woodcuttingLevel + 1) + tree.baseChance, tree.maxChance);
    if (Math.random() * 100 <= chance) {
      const logs = (Math.random() < totalDoubleChance) ? 2 : 1;
      console.log(\`Gained \${logs}x \${tree.name.split(" ")[0]} Logs!\`);
    }
    player.woodcuttingXP += xp;
    document.getElementById("woodcutting-xp").textContent = Math.floor(player.woodcuttingXP);
  }, chopTime);
}

function renderTreeList() {
  const container = document.getElementById("tree-list");
  container.innerHTML = "";
  trees.forEach(tree => {
    if (player.woodcuttingLevel >= tree.levelReq) {
      const div = document.createElement("div");
      div.className = "tree-entry";
      div.innerHTML = \`
        <strong>\${tree.name}</strong> — XP: \${tree.xp}, Time: \${tree.chopTime}s
        <button>Chop</button>
      \`;
      const btn = div.querySelector("button");
      btn.addEventListener("click", () => chopTree(tree));
      container.appendChild(div);
    }
  });
}

export { renderTreeList };

function logMessage(msg) {
  let logDiv = document.getElementById("woodcutting-log");
  if (!logDiv) {
    logDiv = document.createElement("div");
    logDiv.id = "woodcutting-log";
    document.getElementById("woodcutting-section").appendChild(logDiv);
  }
  const p = document.createElement("p");
  p.textContent = msg;
  logDiv.prepend(p);
}