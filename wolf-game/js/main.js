console.log("🐺 main.js が無事に起動したぞ！");

import {
  createRoom,
  joinRoom
}
from "./room.js";


import {
  startGame,
  loadMyRole
}
from "./game.js";


// 部屋作成

document
.getElementById("btnCreateRoom")
.addEventListener(
  "click",
  createRoom
);


// 参加

document
.getElementById("btnJoinRoom")
.addEventListener(
  "click",
  joinRoom
);


// ゲーム開始

const startBtn =
document.getElementById(
  "btnStartOnlineGame"
);


if(startBtn){

  startBtn
  .addEventListener(
    "click",
    startGame
  );

}

import { speakGuide } from "./audio.js";

// --- 音声テストの捜査開始 ---
const testBtn = document.getElementById("btnVoiceTest");
console.log("🔍 捜査報告: ボタンを探した結果 ->", testBtn);

if (testBtn) {
  testBtn.addEventListener("click", () => {
    console.log("🔘 報告: テストボタンが間違いなく押されたぞ！");
    speakGuide("テスト。無慈悲な声が聞こえますか？");
  });
} else {
  console.warn("⚠️ 警告: 'btnVoiceTest' というIDのボタンがHTML内に見つからない！");
}