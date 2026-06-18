export let currentRoomId=null;
export let isHost=false;
export let myName="";
export let myRole="村人";

export let totalPlayers=0;
export let localRoles=[];

export let roleSettings={};

export function setRoleSettings(v){
    roleSettings=v;
}


export function setRoom(v){
 currentRoomId=v;
}


export function setHost(v){
 isHost=v;
}


export function setName(v){
 myName=v;
}


export function setRole(v){
 myRole=v;
}

