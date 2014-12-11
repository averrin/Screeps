module.exports = function (creep) {
    var _ = require('lodash');
    var settings = require('settings');
    var retreat = require('retreat');

    var wh = creep.getActiveBodyparts(Game.WORK) > 0;
    var cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES, { filter: function(c){return c.progress > 0}});
    if(!cs) cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
    
    var source = Game.getObjectById(Memory.Source);
    var guards = _.filter(Game.creeps, {
        memory: {role: 'guard'}
    });
    
    if(!wh) creep.memory.status = "broken";
    //if(_.contains(["transport"], creep.memory.status) && creep.energy < creep.energyCapacity) creep.memory.status = "harvesting";
    if(_.contains(["harvesting"], creep.memory.status) && creep.energy == creep.energyCapacity) creep.memory.status = "transport";
    if(_.contains(["transport"], creep.memory.status) && creep.energy > 0 && !!cs && Memory.building_time) creep.memory.status = "building";
    if(_.contains(["building"], creep.memory.status) && creep.energy == 0) creep.memory.status = "transport";
    if(_.contains(["building"], creep.memory.status) && !cs) creep.memory.status = "transport";
    
    var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
        retreat(creep, ne);
        return;
    }
    
    
    var status = creep.memory.status;
    if(status == "broken") creep.moveTo(Memory.flag.x, Memory.flag.y);
    
    if(status == "transport") {
        if(creep.energy < creep.energyCapacity) {
            if(!Memory.building_time || Game.spawns.Spawn1.energy < creep.energyCapacity){
                creep.moveTo(source);
                if(creep.pos.isNearTo(source)) creep.memory.status = "harvesting";
            }else{
                creep.moveTo(Game.spawns.Spawn1);
                Game.spawns.Spawn1.transferEnergy(creep)
            }
            return
        }else{
            
            var e = _.filter(creep.room.find(Game.MY_STRUCTURES), function(s){
                return s.structureType == Game.STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
            })
            if(!e.length){
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1)
                if(settings.ROADS){
                    var types = _.pluck(creep.room.lookAt(creep.pos), "type");
                    if(!_.contains(types, "road") && !_.contains(types, "constructionSite")){
                        creep.room.createConstructionSite(creep.pos.x, creep.pos.y, Game.STRUCTURE_ROAD);
                    }
                }
            }else{
                creep.moveTo(e[0]);
                creep.transferEnergy(e[0])
            }
            return
        }
    };

    if(status == "building"){
        if(!creep.pos.isNearTo(cs)) creep.moveTo(cs);
        creep.build(cs);
        return
    }
    
    if(status == "harvesting"){
        if(!creep.pos.isNearTo(source)) creep.moveTo(source);
        creep.harvest(source);
    }
    
    // if(!Memory.at_war){
    //  var e = creep.pos.findNearest(Game.DROPPED_ENERGY)
       // if(!!e){
       //     creep.moveTo(e[0]);
       //     creep.pickup(e[0])
       // }
    // }
}