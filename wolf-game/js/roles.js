// 役職初期設定

export function calculateDefaultRoles(count){


    let roles = {
      werewolf:1,
      seer:1,
      medium:0,
      bodyguard:0
    };
  
  
    if(count >= 6)
      roles.bodyguard = 1;
  
  
    if(count >= 8)
      roles.werewolf = 2;
  
  
    if(count >= 9)
      roles.medium = 1;
  
  
    if(count >= 11)
      roles.werewolf = 3;
  
  
  
    return roles;
  
  }
  
  
  
  // 役職を配列化
  
  export function createRolePool(setting){
  
  
    let pool=[];
  
  
    for(let i=0;i<setting.werewolf;i++)
      pool.push("人狼 🐺");
  
  
    for(let i=0;i<setting.seer;i++)
      pool.push("占い師 🔮");
  
  
    for(let i=0;i<setting.medium;i++)
      pool.push("霊媒師 🔮");
  
  
    for(let i=0;i<setting.bodyguard;i++)
      pool.push("狩人 🏹");
  
  
  
    return pool;
  
  }
  
  
  
  
  // シャッフル
  
  export function shuffleRoles(array){
  
  
    for(
      let i=array.length-1;
      i>0;
      i--
    ){
  
      let j =
      Math.floor(
        Math.random()*(i+1)
      );
  
  
      [
        array[i],
        array[j]
      ] =
      [
        array[j],
        array[i]
      ];
  
    }
  
  
    return array;
  
  }