/**
 * worker的工作模式以room为单位，当前不考虑worker跨room工作问题，main只需要把需要处理的room给policy，policy自动判断该room中的worker应该去什么
 */
import { WORKER } from "../spawnCreep/SpawnWorker"
import * as WorkerCommon from "../common/WorkerCommon"
/**
 * 
 * @param {Room} room 
 */
export function roomPolicy(room) {
    var creeps = room.find(FIND_MY_CREEPS, function (creep) { return creep.name.indexOf(WORKER) === 0 });
    if (!room.memory["sourcesStory"]) {
        initSource(room);
    }
    var sourcesStory = room.memory["sourcesStory"];
    var sources = room.find(FIND_SOURCES_ACTIVE);
    var spawns = room.find(FIND_MY_SPAWNS);
    var controller = room.controller;
    var containers = getStructures(room, StructureContainer);
    var extensions = getStructures(room, StructureExtension);
    //暂时没啥思路，先随便写吧

    creeps.forEach(function (creep) {
        var common = creep.memory.work.common;
        var target = Game.getObjectById(creep.memory.work.targetId);
    })
}
var commonPlicy = {
    /**
     * 
     * @param {Creep} creep 
     * @param {Source} target 
     */
    gatherSource: function (creep, target) {
        var store = creep.room.memory.sourcesStory;

        if (creep.store.getFreeCapacity() === 0) {
            //不再采集了，释放该资源的采集空间
            if (target != null) {
                var work = store[target.id].work
                var index = work.indexOf(creep.id);
                if (index !== -1) {
                    work.splice(index, 1);
                }
            }
            this.transport(creep);
            return;
        }

        //如果当前没有采集目标或采集目标没有工作空间
        if (target != null || !workAble(store[target.id])) {

            var sources = room.find(FIND_SOURCES_ACTIVE);
            if (sources !== undefined) {
                var source = sources.find(function (source) {
                    return workAble(store[source.id]);
                });
                if (source !== undefined) {
                    gather(creep, target);
                }
            }

        } else {
            gather(creep, target);
        }

    },

    transport: function (creep, target) {
        if (creep.transfer(target,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE){
            creep.moveTo(target)
        }
    },
    upgradeController: function (creep, target) {
        if (creep.transfer(target,RESOURCE_ENERGY)===ERR_NOT_IN_RANGE){
            creep.moveTo(target)
        }
    }
}
/**
 * 封装了对sourcesStore的操作
 * @param {Creep} creep 
 * @param {*} target 
 * @param {{work:Array<String>,place:Number}} store 
 */
function gather(creep, target, store) {
    var re = WorkerCommon.gather(creep, target);
    //采集成功，为source添加正在采集creepid
    if (re === 0) {
        if (store.work.indexOf(creep.id) === -1) {
            store.work.push(creep.id);
        }
    }
    return re;
}
/**
 * 
 * @param {{work:Array<String>,place:Number}} sourceStory 
 * @returns 
 */
function workAble(sourceStory) {
    return sourceStory.work.length - sourceStory.place !== 0
}

/**
 * 
 * @param {Room} room 
 * @param {Function} clazz
 * @returns 
 */
function getStructures(room, clazz) {
    return room.find(FIND_STRUCTURES, {
        filter: function (structure) {
            return structure instanceof clazz
        }
    });
}

/**
 * 获取target周围非wall地形的数量
 * ps:感觉不够严谨，先这样
 * @param {*} target 
 * @returns  int
 * 
 */
function getSpaceForTarget(target) {
    var pos = target.pos;
    var room = target.room;
    var array = room.lookForAtArea(LOOK_TERRAIN, pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1).filter(function (te) { return te.terrain == "wall" });
    return 8 - array.length;
}
/**
 * 
 * @param {Room} room 
 */
function initSource(room) {
    var sources = root.find(FIND_SOURCES_ACTIVE);
    var sourcesStory = {}
    sources.forEach(function (source) {
        sourcesStory[source.id] = {
            place: getSpaceForTarget(source),
            work: []
        }
    })
    room.memory.sourcesStory = sourcesStory;
}