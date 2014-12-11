module.exports = function (creep) {
    var _ = require('lodash');
    var settings = require('settings');
    var retreat = require('retreat');
    var targeting = require('targeting');
    var targets = creep.room.find(Game.HOSTILE_CREEPS);
    var ah;
    if(creep.memory.type != "range"){
        ah = creep.getActiveBodyparts(Game.ATTACK) > 0;
    }else{
        ah = creep.getActiveBodyparts(Game.RANGED_ATTACK) > 0;
    }
    var healer = creep.pos.findNearest(Game.MY_CREEPS, {
        filter: function(object) {
            return creep.memory.role == "healer";
        }
    });
    var status = creep.memory.status;
    
    if(!ah || (creep.hits < creep.hitsMax/3 && !!healer && healer.length > 0)) creep.memory.status = "broken";
    if(status == "init" && creep.pos.isNearTo(Game.flags.Flag1)) creep.memory.status = "relax";
    if(ah && !targets.length && status != "init") creep.memory.status = "relax";
    if(ah && targets.length) creep.memory.status = "to_fight";
    
    
    if(status == "broken"){
        var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
        if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
            retreat(creep, ne);
            return;
        }else{
            if(!!healer){
                creep.moveTo(healer[0]);
            }else{
                creep.moveTo(Memory.flag.x, Memory.flag.y);
            }
            return;
        }
    }
    
    if(status == "init"){
        creep.moveTo(Memory.flag.x, Memory.flag.y);
        return;
    }
    
    if(status == "relax"){
        creep.moveTo(
            Math.floor(Math.random()* (Memory.flag.x + 19) + (Memory.flag.x - 19)),
            Math.floor(Math.random()* (Memory.flag.y + 19) + (Memory.flag.y - 19))
        );
        return;
    }

    if(status == "to_fight" ) {
        var nc = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if(!!nc && creep.pos.inRangeTo(nc, 2)){
                if(creep.memory.type == "range"){
                    retreat(creep, nc);
                    creep.rangedAttack(nc);
                    return;
                }else{
                    creep.moveTo(nc);
                    creep.attack(nc);
                    return;
                }
            }
        
        var target = targeting(creep);
            
        if(!!target){
            if(creep.memory.type == "range"){
                if(creep.pos.inRangeTo(target, 3)) {
                    creep.rangedAttack(target);
                    retreat(creep, target);
                }else{
                    creep.moveTo(target);
                }
            }else{
                creep.moveTo(target);
                creep.attack(target);
            }
        }
    }
}