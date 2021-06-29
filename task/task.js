import { TaskMannage } from "./TaskMannage";
export const Task={
    source:{
        /**
         * 
         * @param {Source} source 
         */
        gatherEnergyTask:function(source){
            var store = source.room.memory.sourcesStore;
            task=TaskMannage.find(source.id);
            if(task===null&&source.energy!=0){
                
            }
        }
    }
}