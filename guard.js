var _ = require('lodash');
var settings = require('settings');
var retreat = require('retreat');
var targeting = require('targeting');

module.exports = function () {

    var guard = function() {};

    guard.main = function(creep){
        var targets = creep.room.find(Game.HOSTILE_CREEPS);
        var ah;

        if(!targets.length){
            guard.set_position(creep);
        }

        if(creep.memory.type != "range"){
            ah = creep.getActiveBodyparts(Game.ATTACK) > 0;
        }else{
            ah = creep.getActiveBodyparts(Game.RANGED_ATTACK) > 0;
        }
        var healer = creep.pos.findNearest(Game.MY_CREEPS, {
            filter: function(object) {
                return object.memory.role == "healer";
            }
        });
        var status = creep.memory.status;
        
        if(!ah || (creep.hits < creep.hitsMax/3 && !!healer && healer.length > 0)) creep.memory.status = "broken";
        if(status == "init" && creep.pos.isNearTo(Game.flags.Flag1)) creep.memory.status = "relax";
        if(ah && !targets.length && status != "init") creep.memory.status = "relax";
        if(ah && targets.length) creep.memory.status = "to_fight";
        
        var nb = creep.pos.findInRange(Game.MY_CREEPS, 1, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        })
        if(creep.hits < creep.hitsMax){
            if(creep.getActiveBodyparts(Game.HEAL) > 0){
                console.log(creep.heal(creep))
            }
        }
        
        if(status == "broken"){
            var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
            if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
                if(creep.memory.type == "range"){
                    retreat(creep, ne);
                    creep.rangedAttack(ne);
                    return;
                }
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
        
        if(status == "relax" || status == "init"){
            if(!!creep.memory.x && !creep.pos.isNearTo(creep.memory.x,
                    creep.memory.y)){
                creep.moveTo(
                    creep.memory.x,
                    creep.memory.y
                );
            }
            return;
        }

        if(status == "to_fight" ) {
            creep.memory.x = null;
            var nc = creep.pos.findNearest(Game.HOSTILE_CREEPS);
                if(!!nc && creep.pos.inRangeTo(nc, 3)){ //TODO: test it with 3
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

    guard.set_position = function(creep){
        var exits_d = [Game.EXIT_TOP, Game.EXIT_LEFT, Game.EXIT_BOTTOM, Game.EXIT_RIGHT];
        var exits = [];
        var d;
        _.forEach(exits_d, function(d){
            d = creep.room.find(d);
            if(d.length){
                exits.push(d[2]);
            }
        })
        if(!creep.memory.x || _.min(_.map(exits, function(e){
            return e.pos.findPathTo(creep.memory.x, creep.memory.y, {ignoreCreeps: true}).length;
        })) > settings.MAGIC.GUARD_DIST || _.min(_.map(creep.room.find(Game.SOURCES), function(e){
            return e.pos.findPathTo(creep.memory.x, creep.memory.y, {ignoreCreeps: true}).length;
        })) < 3){
            creep.memory.x = Math.floor(Math.random()*40) + 5;
            creep.memory.y = Math.floor(Math.random()*40) + 5;
        }
    }

    return guard;
}