export function gather(creep, target) {

    //确认矿物类型
    var resourceType = RESOURCE_ENERGY;
    if (target instanceof Mineral) {
        resourceType = target.mineralType;
    } else if (target instanceof Deposit) {
        resourceType = target.depositType;
    }

    if (creep.memory.storyType === null || creep.memory.storyType === resourceType) {
        var re = creep.harvest(target);
    } else {
        //矿物类型不对
        return -71;
    }

    switch (re) {
        case -9:
            creep.moveTo(s);
            break;
        case 0:
            creep.memory.storyType = resourceType;
            break;
        default:
            console.log(re);
    }
    return re;
}
export function transport(creep, target) {
    var resourceType = creep.memory.storyType;
    var freeCapacity = target.store.getFreeCapacity(resourceType);
    if (freeCapacity === null) {
        return -81;
    }
    var re = creep.transfer(target, resourceType, target.store.getFreeCapacity());
    if (creep.store.getUsedCapacity() === 0) {
        creep.memory.storyType = null;
    }
    return re;
}
export function upgradeController(creep, controller) {
    var re = creep.upgradeController(r.controller);
    if (re === -9)
        creep.moveTo(r.controller);
    if (creep.store.getUsedCapacity() === 0)
        creep.memory.storyType = null;
    return re;
}