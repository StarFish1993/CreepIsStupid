# 施工指南
项目分为`Common,SpawnCreep,Policy`三个模块，common是creep的行动组，SpawnCreep用于存放不同类型的creep和creep的生成控制，Policy用来是控制creep的策略树。

sceep根据其功能分为`worker，explorer，soldier`三种类型，三种类型分辨有不同的行动组，生成器和策略树。