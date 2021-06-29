import _ from "lodash";
export var TaskMannage = {
    /**
     * 推送任务
     * @param {String} name 
     * @param {String} id 
     * @param {Number} creepAmount
     * @param {Array<String>} roles
     * @param {Array<{type:String,id:String}>} arg 
     */
    push: function (name, id, creepAmount, roles, arg) {
        Memory.tasks[id] = {
            name: name,
            creepAmount: creepAmount,
            roles: roles,
            creeps: [],
            arg: arg
        }
    },
    /**
     * @todo 移除销毁某个任务
     * @param {String}} id 
     */
    destory: function (id) {

    },
    /**
     * @todo 没测试
     * 统一为没有工作的creeps分配工作
     * @param {{role:Array<Creep>}} creeps
     * @returns {{role:Array<Creep>}}
     * 返回分工分配到工作的creep
     */
    settleTask: function (creeps) {
        var tasks = Memory.task;
        forInTasks(tasks, 0);

        return creeps;

        function forInTasks(tasks, roleIndex) {
            var ri = roleIndex;
            //标记是否计算了下一个优先级
            var rif = true;
            //为所有任务分配第 roleIndex 优先级角色的creep
            _.forIn(tasks, (task, id) => {

                var amount = needCreep(task);

                var roles = task.roles;
                //确保该任务需要人手，且该优先级下有对应角色
                if (amount > 0 && roles.length <= roleIndex + 1) {
                    
                    var cs = creeps[roles[roleIndex]];

                    var workCreeps = _.slice(cs, 0, amount);
                    
                    var cs=_.drop(cs,amount);
                    //如果该角色没有creep了，这将其设置为undefined
                    creeps[roles[roleIndex]]=cs.length===0?undefined:cs;

                    workCreeps.forEach(creep => {
                        creep.memory.task = id;
                        task.creeps.push(creep.id);
                    })

                    //当该任务有下一个优先级角色，且下一优先级没有被计算过，且该任务还需要人手
                    if (roles.length > roleIndex + 1 && rif && needCreep(task) !== 0) {
                        ri++;
                        rif = false;
                    }

                }

            });
            // 如果还有任务没有分配人手，且有下一个优先级的角色可用
            if (!rif) {
                forInTasks(tasks, ri);
            }
        }
    },
    /**
     * 判断建筑是否存在任务
     * @param {String} id 
     * @returns {name:String,creepAmount:String,roles:Array<String>,creeps:Array<String>,arg:Array<{type:String,id:String}>}
     * 存在返回任务，否则返回null
     */
    find: function (id) {
        var task = Memory.tasks[id];
        return task === undefined ? null : task;
    },
    /**
     * 返回还需要的creep数量
     * @param {{name:String,creepAmount:String,roles:Array<String>,creeps:Array<String>,arg:Array<{type:String,id:String}>}} task 
     * @returns {Number}
     */
    needCreep: function (task) {
        return task.creepAmount - task.creeps.length;
    }
}