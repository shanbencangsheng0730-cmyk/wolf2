const screens=[
"screenOnlineMenu",
"screenA",
"screenWaiting",
"screenRoleCheck"
];

export function hideAll(){
screens.forEach(id=>{
document.getElementById(id)?.classList.add("hidden");
});
}

export function show(id){
hideAll();
document.getElementById(id)?.classList.remove("hidden");
}
