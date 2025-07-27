export const AxeSystem = (() => {
  const axes = [
    { name: "Labrys", unlockCost: 0, levelReq: 1, doubleLogChance: 0, xpMultiplier: 1.0 },
    { name: "Pelekys", unlockCost: 50, levelReq: 60, doubleLogChance: 0.10, xpMultiplier: 1.0 },
    { name: "Epsilon Axe", unlockCost: 1000, levelReq: 80, doubleLogChance: 0.10, xpMultiplier: 1.10 }
  ];
  let currentAxe = axes[0];
  function getCurrentAxe() { return currentAxe; }
  function equipAxe(index, playerGold, woodcuttingLevel) {
    const axe = axes[index];
    if (woodcuttingLevel >= axe.levelReq && playerGold >= axe.unlockCost) {
      currentAxe = axe;
      return { success: true, cost: axe.unlockCost };
    }
    return { success: false };
  }
  return {
    getCurrentAxe,
    equipAxe,
    getAxeList: () => axes
  };
})();