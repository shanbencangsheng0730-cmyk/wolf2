import {
    db,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot
  }
  from "./firebase.js";
  
  
  import {
    setRoom,
    setHost,
    setName
  }
  from "./state.js";
  
  
  import {
    show
  }
  from "./ui.js";
  
  
  
  // 部屋作成
  
  export async function createRoom(){
  
  
    const roomId =
      String(
        Math.floor(
          1000 + Math.random() * 9000
        )
      );
  
  
    setRoom(roomId);
  
    setHost(true);
  
  
  
    await setDoc(
      doc(db,"rooms",roomId),
      {
        status:"waiting",
        players:[],
        rolesDistributed:{}
      }
    );
  
  
    document
    .getElementById("hostRoomIdA")
    .textContent = roomId;
  
  
    show("screenA");
    setRoom(roomId)
    listenRoom(roomId);
  
  
  }
  
  
  
  
  
  // 部屋参加
  
  export async function joinRoom(){
  
  
    const roomId =
      document
      .getElementById("inputRoomId")
      .value.trim();
  
  
  
    const name =
      document
      .getElementById("inputPlayerName")
      .value.trim();
  
  
  
    if(!roomId || !name){
  
      alert("部屋番号と名前を入力してください");
  
      return;
  
    }
  
  
  
    const roomRef =
      doc(db,"rooms",roomId);
  
  
  
    const snap =
      await getDoc(roomRef);
  
  
  
    if(!snap.exists()){
  
      alert("部屋がありません");
  
      return;
  
    }
  
  
  
    const data =
      snap.data();
  
  
  
    if(data.status !== "waiting"){
  
      alert("ゲーム中です");
  
      return;
  
    }
  
  
  
    if(data.players.includes(name)){
  
      alert("その名前は使用されています");
  
      return;
  
    }
  
  
  
  
    await updateDoc(
      roomRef,
      {
        players:[
          ...data.players,
          name
        ]
      }
    );
  
  
  
    setRoom(roomId);
  
    setName(name);
  
  
  
    document
    .getElementById("waitRoomId")
    .textContent = roomId;
  
  
    document
    .getElementById("displayMyName")
    .textContent = name;
  
  
  
    show("screenWaiting");
    setRoom(roomId)
    listenRoom(roomId)
  
  }

  export function listenRoom(roomId){


    onSnapshot(
      doc(db,"rooms",roomId),
      (snapshot)=>{
  
  
        if(!snapshot.exists())
          return;
  
  
        const data =
          snapshot.data();
  
  
        const players =
          data.players || [];
  
  
  
        const list =
          players
          .map(
            p=>`<li>👤 ${p}</li>`
          )
          .join("");
  
  
  
        const waitList =
        document.getElementById(
          "waitMemberList"
        );
  
  
        const hostList =
        document.getElementById(
          "hostMemberListA"
        );
  
  
        if(waitList)
          waitList.innerHTML=list;
  
  
        if(hostList)
          hostList.innerHTML=list;
  
  
  
        // ゲーム開始通知
  
        if(data.status==="playing"){

          import("./game.js")
          .then(game=>{
            game.loadMyRole

          })
  
        }
  
  
      }
    );
  
  }