import { AxeSystem } from './axe.js';
import { player } from './player.js';

function renderAxeList() {
  const container = document.getElementById("axe-list");
  container.innerHTML = "";
  const axes = AxeSystem.getAxeList();
  const current = AxeSystem.getCurrentAxe();

  axes.forEach((axe, index) => {
    const li = document.createElement("li");
    const canUse = player.woodcuttingLevel >= axe.levelReq;
    const canAfford = player.gold >= axe.unlockCost;
    const isEquipped = current.name === axe.name;
    li.innerHTML = \`
      <strong>\${axe.name}</strong>
      — Req: Lv \${axe.levelReq}, Cost: \${axe.unlockCost} Gold
      \${isEquipped ? "✅ Equipped" : ""}
      <button \${(!canUse || !canAfford || isEquipped) ? "disabled" : ""}>
        Equip
      </button>
    \`;
    const button = li.querySelector("button");
    if (button && !button.disabled) {
      button.addEventListener("click", () => {
        const result = AxeSystem.equipAxe(index, player.gold, player.woodcuttingLevel);
        if (result.success) {
          player.gold -= result.cost;
          renderAxeList();
        } else {
          alert("You don't meet the requirements.");
        }
      });
    }
    container.appendChild(li);
  });
}

export { renderAxeList };