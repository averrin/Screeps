module.exports = function (creep) {
    var _ = require('lodash');
    var settings = require('settings');
    var retreat = require('retreat');
    
    var healers = _.filter(Game.creeps, {
        memory: {role: 'healer'}
    });
    if(!creep.getActiveBodyparts(Game.HEAL) && _.size(healers) == 1){
        creep.suicide();
    }
    
    var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
        retreat(creep, ne);
        return;
    }

    var target = creep.pos.findNearest(Game.MY_CREEPS, {
        filter: function(c){
            if(c.hits < c.hitsMax && c.id != creep.id){
                return c
            }
        }
    })
    if(!!target) {
        creep.moveTo(target);
        creep.heal(target);
        return;
    }else{
        if(Memory.at_war){
            target = creep.pos.findNearest(Game.MY_CREEPS, {filter: function(object) {
                return object.memory.role == "guard";
            }});
            creep.moveTo(target)
        }else{
            if(Game.flags.length){
                creep.moveTo(Game.spawns.Spawn1);
            }else{
                creep.moveTo(Memory.flag.x, Memory.flag.y);
            }
        }
    }
}