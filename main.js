var f=Game.spawns['first'];
f.spawnCreep([WORK,CARRY,MOVE],"famer1");
var famerSize=0;
var MAX_FAMER=5;
var r=Game.rooms['E42N54'];
var s=r.find(FIND_SOURCES_ACTIVE);
s=s[1].energy==0?s[0]:s[1];
for(var i in Game.creeps) {

    var creep=Game.creeps[i];
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
    
    var name="famer0";
    for(var i=0;Game.creeps[name];i++){
        name="famer"+i;
    }
    
    f.spawnCreep([WORK,CARRY,MOVE],name);
}