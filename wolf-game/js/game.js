import {
  db,
  doc,
  updateDoc,
  getDoc
} from "./firebase.js";

import {
  currentRoomId,
  myName,
  setRole
} from "./state.js";

import {
  calculateDefaultRoles,
  createRolePool,
  shuffleRoles
} from "./roles.js";

import {
  show
} from "./ui.js";

// ★ 追加：作成した音声モジュールを読み込む
import { speakGuide } from "./audio.js";


export async function startGame(){

    // ★ 追加：ゲーム開始と同時にシステムに喋らせる
  // ホストが「ボタンをクリックした」直後の処理なので、ブラウザの自動再生ブロックを完璧にすり抜けられるぞ。
  speakGuide("夜が来ました。人狼の皆さん、目を覚ましてください。画面を長押しして、自らの運命を確認するのです。");

  
  console.log("開始ボタンが押された")
  console.log("部屋ID:",currentRoomId)

  const roomRef = doc(db, "rooms", currentRoomId);
  const snap = await getDoc(roomRef);

  if(!snap.exists()) return;

  const data = snap.data();
  const players = data.players || [];

  if(players.length < 2){
    alert("2人以上必要です");
    return;
  }

  // 役職作成
  const settings = calculateDefaultRoles(players.length);
  let rolePool = createRolePool(settings);

  // 足りない分は村人
  while(rolePool.length < players.length){
    rolePool.push("村人 🧑");
  }

  rolePool = shuffleRoles(rolePool);

  let roles = {};

  players.forEach((player,index)=>{
    roles[player] = rolePool[index];
  });

  await updateDoc(roomRef, {
    status:"playing",
    rolesDistributed:roles,
    phase:"night",
    turn:1
  });

  show("screenRoleCheck")

}

export function showMyRole(role){
  const area = document.getElementById("roleCardArea");
  if(area){
    area.textContent = "あなたの役職：" + role;
  }
}

export async function loadMyRole(){
  const roomRef = doc(db, "rooms", currentRoomId);
  const snap = await getDoc(roomRef);
  if(!snap.exists()) return;

  const data = snap.data();
  const role = data.rolesDistributed[myName];

  setRole(role);

  const area = document.getElementById("roleCardArea");
  if(area){
    area.textContent = "あなたの役職：" + role;
  }
}