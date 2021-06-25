/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('WorkerCommon');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /**
     * 采矿命令
     * 如果creep携带了resource，就只能采集携带的这种resource
     * @param {Crreep} creep 
     * @param {Source , Deposit or Mineral} target 
     * @returns 
     * 返回值参考creep.harvest
     * -71:矿物类型与creep携带不符
     */
    gather:function(creep,target){
        
        //确认矿物类型
        var resourceType=RESOURCE_ENERGY;
        if(target instanceof Mineral){
            resourceType=target.mineralType;
        }else if(target instanceof Deposit){
            resourceType=target.depositType;
        }
        
        if(creep.memory.storyType===null||creep.memory.storyType===resourceType){
            var re=creep.harvest(target)
        }else{
            //矿物类型不对
            return -71;
        }
        
        switch(re){
            case -9:
                creep.moveTo(s);
                break;
            case 0:
                creep.memory.storyType=resourceType;
                break;
            default :
                console.log(re);
        }
        return re;
    },
    /**
     * 存放矿物
     * @param {Creep} creep 
     * @param {Structure} target 
     * @returns 
     */
    transport:function(creep,target){
        var resourceType=creep.memory.storyType;
        var freeCapacity=target.store.getFreeCapacity(resourceType);
        if(freeCapacity===null){
            return -81;
        }
        var re=creep.transfer(target,resourceType,target.store.getFreeCapacity());
        if(creep.store.getUsedCapacity()===0){
            creep.memory.storyType=null;
        }
        return re;
    },
    upgradeController:function(creep,controller){
        var re=creep.upgradeController(r.controller);
        if(re===-9) creep.moveTo(r.controller);
        if(creep.store.getUsedCapacity()===0) creep.memory.storyType=null;
        return re;
    }
};