module.exports = function(creep){
    var _ = require('lodash');
    var settings = require('settings');
    var retreat = require('retreat');
    
    var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
        creep.memory.status = "in_fear";
        retreat(creep, ne);
        return;
    }
    var builders = _.filter(Game.creeps, function(b){
        return b.memory.role == "builder" && b.energy < b.energyCapacity;
    })
    var e = _.filter(creep.room.find(Game.MY_STRUCTURES), function(s){
        return s.structureType == Game.STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
    })
    
    var b = creep.pos.findInRange(Game.MY_CREEPS, 1, {filter: function(c){
        return c.memory.role == "builder" && c.memory.status == "building" && c.energy <= c.energyCapacity;
    }});
    b = _.sortBy(b, function(c){
        return 0 - c.memory.tier;
    })
    var look = creep.room.lookAt(creep);
    var t = false;
    look.forEach(function(lookObject) {
        if(lookObject.type == 'constructionSite') {
            t = true;
            return;
        }
    });
    if(b.length > 0 && creep.energy && !t) {
        if(Memory.counts.suppliers < Memory.counts.builders){
            creep.memory.status = "supply";
            creep.transferEnergy(b[0])
        }else{
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
        }
        return;
    }
        
    var miner = Game.getObjectById(creep.memory.miner);
    if(!miner){
         creep.memory.miner = require("lone_miners")(creep.room);
    }
    if(creep.energy < creep.energyCapacity) {
        if(!creep.pos.isNearTo(miner)){
            creep.memory.status = "empty";
            creep.moveTo(miner);
        }else{
            var target = creep.pos.findNearest(Game.DROPPED_ENERGY);
            if(!!target){
                creep.memory.status = "searching";
                creep.moveTo(target);
                creep.pickup(target);
            }
        }
    }else{
        if(!e.length){
            if(!_.size(builders)){
                creep.memory.status = "full";
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1)
            }else{
                creep.memory.status = "to_builder";
                creep.moveTo(builders[0]);
                creep.transferEnergy(builders[0])
            }
        }else{
            creep.memory.status = "in_ext";
            creep.moveTo(e[0]);
            creep.transferEnergy(e[0])
        }
        return
    }
}