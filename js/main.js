import { renderAxeList } from './axeUI.js';
import { updateFavorDisplay } from './blessing.js';
import { renderTreeList } from './woodcutting.js';
import { player } from './player.js';

function updateResourcesUI() {
  document.getElementById("current-faith").textContent = player.faith;
  document.getElementById("current-favor").textContent = player.favor;
  document.getElementById("current-gold").textContent = player.gold;
}

function showSection(section) {
  console.log("Switching to section:", section);
  document.getElementById("home-section").classList.add("hidden");
  document.getElementById("woodcutting-section").classList.add("hidden");
  document.getElementById(section + "-section").classList.remove("hidden");

  if (section === "woodcutting") renderTreeList();
  updateResourcesUI();
}

function startFaithGeneration() {
  setInterval(() => {
    player.faith += 1;
    updateResourcesUI();
  }, 1000);
}

window.onload = () => {
  renderAxeList();
  updateFavorDisplay();
  renderTreeList();
  startFaithGeneration();
  window.showSection = showSection;
  updateResourcesUI();
};