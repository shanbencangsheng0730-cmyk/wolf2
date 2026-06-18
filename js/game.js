import {
    db,
    doc,
    updateDoc,
    getDoc
  }
  from "./firebase.js";
  
  
  import {
    currentRoomId,
    myName,
    setRole
  }
  from "./state.js";
  
  
  import {
    calculateDefaultRoles,
    createRolePool,
    shuffleRoles
  }
  from "./roles.js";
  
  import {
    show
  }
  from "./ui.js";
  
  
  
  export async function startGame(){

    console.log("開始ボタンが押された")

    console.log("部屋ID:",currentRoomId)
  
  
    const roomRef =
    doc(
      db,
      "rooms",
      currentRoomId
    );
  
  
    const snap =
    await getDoc(roomRef);
  
  
  
    if(!snap.exists())
      return;
  
  
  
    const data =
    snap.data();
  
  
  
    const players =
    data.players || [];
  
  
  
    if(players.length < 2){
  
      alert("2人以上必要です");
  
      return;
  
    }
  
  
  
    // 役職作成
  
    const settings =
    calculateDefaultRoles(
      players.length
    );
  
  
    let rolePool =
    createRolePool(settings);
  
  
  
    // 足りない分は村人
  
    while(
      rolePool.length < players.length
    ){
  
      rolePool.push("村人 🧑");
  
    }
  
  
  
    rolePool =
    shuffleRoles(rolePool);
  
  
  
    let roles = {};
  
  
  
    players.forEach(
      (player,index)=>{
  
        roles[player]
        =
        rolePool[index];
  
      }
    );
  
  
  
    await updateDoc(
      roomRef,
      {
  
        status:"playing",
  
        rolesDistributed:roles,
  
        phase:"night",
  
        turn:1
  
      }
    );
  show("screenRoleCheck")
  
  }
  export function showMyRole(role){

    const area =
    document.getElementById(
      "roleCardArea"
    );
  
  
    if(area){
  
      area.textContent =
      "あなたの役職：" + role;
  
    }
  
  }
  export async function loadMyRole(){


    const roomRef =
    doc(
      db,
      "rooms",
      currentRoomId
    );
  
  
    const snap =
    await getDoc(roomRef);
  
  
    if(!snap.exists())
      return;
  
  
  
    const data =
    snap.data();
  
  
  
    const role =
    data.rolesDistributed[myName];
  
  
  
    setRole(role);
  
  
  
    const area =
    document.getElementById(
      "roleCardArea"
    );
  
  
    if(area){
  
      area.textContent =
      "あなたの役職：" + role;
  
    }
  
  
  }