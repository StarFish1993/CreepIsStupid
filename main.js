let f=Game.spawns['first'];
f.spawnCreep([WORK,CARRY,MOVE],"famer1");
let famerSize=0;
const MAX_FAMER = 5;
const r = Game.spawns['first'].room;
let s = r.find(FIND_SOURCES_ACTIVE);
s=s[1].energy===0?s[0]:s[1];
for(let i in Game.creeps) {
    let creep=Game.creeps[i];
    if(creep.store.getUsedCapacity()===0){
        creep.memory.isWork=false;
    }
    if(creep.store.getFreeCapacity()!==0&&!creep.memory.isWork){
        creep.moveTo(s);
        creep.harvest(s);
    }else if(f.store.getFreeCapacity(RESOURCE_ENERGY)!==0){
        creep.moveTo(f);
        creep.transfer(f,RESOURCE_ENERGY,f.store.getFreeCapacity());
    }else if(creep.store.getUsedCapacity!==0){
        creep.memory.isWork=true;

        if(creep.upgradeController(r.controller)===-9)
            creep.moveTo(r.controller);
    }
    famerSize++;
}

if(famerSize<MAX_FAMER&&!f.spawning){
    
    let name="famer0";
    for(let i=0;Game.creeps[name];i++){
        name="famer"+i;
    }
    
    f.spawnCreep([WORK,CARRY,MOVE],name);
}