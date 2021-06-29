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
        Memory.tasks[id]={
            name:name,
            creepAmount:creepAmount,
            roles:roles,
            creeps:[],
            arg:arg
        }
    },
    /**
     * @todo 移除销毁某个任务
     * @param {String}} id 
     */
    destory: function (id) {

    },
    /**
     * @todo 核心部分未完成
     * 统一为没有工作的creeps分配工作
     * @param {{role:Array<Creep>}} creeps
     */
    settleTask:function(creeps){
        var tasks=Memory.task;
        var ps={};
        _.forIn(tasks,function(id,task){
            var amount=needCreep(task);
            if(amount>0){
                var roles=task.roles;
                roles.forEach(role => {
                    var cs=creeps[role];            
                });
            }
        });
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
        return task.creepAmount-task.creeps.length;
    }
}