var _ = require('lodash');
var settings = require('settings');
var retreat = require('retreat');

module.exports = function () {

    var builder = function(){};

    builder.main = function(creep){
    
        var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
        if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
            creep.memory.status = "in_fear";
            retreat(creep, ne);
            return;
        }
        if(creep.memory.status == "relax" && creep.energy > 50){
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1);
            return
        }

        var wh = creep.getActiveBodyparts(Game.WORK) > 0;
        var cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES, { filter: function(c){return c.progress > 0}});
        if(!cs) cs = creep.pos.findNearest(Game.MY_STRUCTURES, {filter: function(s){
            return s.hits < s.hitsMax;
        }});
        if(!cs) cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
        if(!cs){
            creep.memory.status = "relax"
            creep.moveTo(Memory.flag.x, Memory.flag.y);
            return;
        }
        if(!creep.pos.isNearTo(cs)) creep.moveTo(cs);
        if(cs.hits){
            creep.repair(cs);
        }else{
            creep.build(cs);
        }
        creep.memory.status = "building"
        return
    }

    return builder;
}