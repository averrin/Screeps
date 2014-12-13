module.exports = function (tier) {

    var settings = require('settings');
    var _ = require('lodash');
    var guards = Memory.counts.guards;
    var healers = Memory.counts.healers;
    var harvesters = Memory.counts.harvesters;
    var res;

    if(tier > 1 && guards < 8){
        tier = tier -1;
    }
    
    if(guards < settings.INIT_GUARDIANS){
        Memory.spawn_order = {"body": settings.BODY.GUARD_MELEE[tier], "memory": {"role": "guard", "tier": tier, "type": "melee", "status": "init"}};
        return;
    }

    // if(Game.spawns.Spawn1.energy < settings.HEALER_PRICE) return;
    if(healers < guards / 5){
        Memory.spawn_order = {"body": settings.BODY.HEALER[tier], "memory": {"role": "healer", "tier": tier}};
        return;
    }
    
    // if(Memory.counts.range_guards < settings.GUARD_RANGE_TIER1){
        Memory.spawn_order = {"body": settings.BODY.GUARD_RANGE[tier], "memory": {"role": "guard", "tier": tier, "type": "range", "status": "init"}};
        return
    // }
    return
}