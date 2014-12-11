module.exports = function (tier) {

    var settings = require('settings');
    var _ = require('lodash');
    var guards = Memory.counts.guards;
    var healers = Memory.counts.healers;
    var harvesters = Memory.counts.harvesters;
    var res;
    
    if(guards < settings.INIT_GUARDIANS){
        Memory.spawn_order = {"body": settings["GUARD_BODY_MELEE"+tier], "memory": {"role": "guard", "tier": tier, "type": "melee", "status": "init"}};
        return;
    }

    // if(Game.spawns.Spawn1.energy < settings.HEALER_PRICE) return;
    if(healers < guards / 5){
        Memory.spawn_order = {"body": settings["HEALER_BODY"+tier], "memory": {"role": "healer", "tier": tier}};
        return;
    }
    
    // if(Memory.counts.range_guards < settings.GUARD_RANGE_TIER1){
        Memory.spawn_order = {"body": settings["GUARD_BODY_RANGE"+tier], "memory": {"role": "guard", "tier": tier, "type": "range", "status": "init"}};
        return
    // }
    return
}