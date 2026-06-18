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