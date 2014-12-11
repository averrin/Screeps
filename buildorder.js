module.exports = function (tier) {
    var settings = require('settings');
    
    require("buildorder_" + settings.MODE)(tier);

    var order = Memory.spawn_order;
    var spawn = Game.spawns.Spawn1;
    if(!!spawn.spawning){
        if(spawn.spawning.remainingTime > 1){
            return;
        }else{
            Memory.spawn_order = null;
            return;
        }
    }
    if(!order || !order.body) return;
    if(spawn.energy < settings.body_cost(order.body)) return;
    var res = spawn.createCreep(order.body, null, order.memory);
    console.log("Spawning:", res, "["+order.memory.role+"]")

}