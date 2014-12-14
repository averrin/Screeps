module.exports = function (tier, spawn) {

    var settings = require('settings');
    var _ = require('lodash');
    var guards = Memory.counts.guards;
    var healers = Memory.counts.healers;
    var harvesters = Memory.counts.harvesters;
    var res;

    // if(tier > 1 && guards < 8){
    //     tier = tier -1;
    // }
    
    if(guards < settings.INIT_GUARDIANS && tier == 1){
        spawn.memory.spawn_order = {"body": settings.BODY.GUARD_MELEE[tier], "memory": {"role": "guard", "tier": tier, "type": "melee", "status": "init"}};
        return;
    }

    if(healers < guards / 5){
        spawn.memory.spawn_order = {"body": settings.BODY.HEALER[tier], "memory": {"role": "healer", "tier": tier}};
        return;
    }
    
    spawn.memory.spawn_order = {"body": settings.BODY.GUARD_RANGE[tier], "memory": {"role": "guard", "tier": tier, "type": "range", "status": "init"}};
    return
}