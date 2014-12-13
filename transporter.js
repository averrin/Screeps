var _ = require('lodash');
var settings = require('settings');
var retreat = require('retreat');

module.exports = function() {

    var transporter = function() {};

    transporter.main = function(creep) {

        if(!creep.energy){
            creep.memory.status = "empty";
        }

        var look = creep.room.lookAt(creep);
        look.forEach(function(lookObject) {
            if(lookObject.type == 'constructionSite') {
                creep.moveTo(Game.spawns.Spawn1);
                return;
            }
        });

        if(transporter.pickup(creep)) return;
        // console.log(1, creep)
        if(transporter.in_fear(creep)) return;
        // console.log(2, creep)
        //if(transporter.to_empty(creep)) return;
        // console.log(3, creep)
        if(transporter.supply(creep)) return;
        // console.log(4, creep)
        if(transporter.harvest(creep)) return;
        // console.log(5, creep)
        if(transporter.charge_ext(creep)) return;
        if(transporter.charge_builder(creep)) return;
        // console.log(6, creep)
        // console.log(7, creep)
        if(transporter.charge_spawn(creep)) return;

        console.log("Transporter error", creep, creep.energy == creep.energyCapacity);
    };
    

    transporter.harvest = function(creep) {            
        // var miner = Game.getObjectById(creep.memory.miner);
        // var tfm = _.filter(Game.creeps, function(c){
        //     return c.memory.miner == creep.memory.miner
        // }).length;
        // if(!miner || tfm > miner.memory.transport_count){
        //     creep.memory.miner = require("lone_miners")(creep.room);
        //     miner = Game.getObjectById(creep.memory.miner);
        // }
        // if(!miner) return false;

        if(creep.energy < creep.energyCapacity) {
            // var mn = miner.pos.isNearTo(Game.DROPPED_ENERGY, {filter: function(e){
            //     return e.energy >= creep.energyCapacity;
            // }});
            // if(!!miner && mn){
            //     if(!creep.pos.isNearTo(miner)){
            //         creep.memory.status = "empty";
            //         creep.moveTo(miner);
            //         return true;
            //     }
            // }else{
                if(!Game.getObjectById(creep.memory.target)){
                    // console.log(4.1, creep)
                    var target = _.sortBy(creep.room.find(Game.DROPPED_ENERGY), function(s){
                        var transporters = creep.room.find(Game.MY_CREEPS, {filter: function(c){
                            return c.memory.role == "transporter" && c.memory.target == s.id;
                        }});
                        var val = _.reduce(transporters, function(sm, t){
                            return sm + t.energyCapacity;
                        }, 0);
                        return 0-(s.energy - val) // creep.pos.findPathTo(s.pos).length;
                    });
                    if(target.length){
                        creep.memory.target = target[0].id;
                        creep.moveTo(target[0]);
                        creep.memory.status = "empty";
                        return true;
                    }
                }else{
                    // console.log(4.2, creep)
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                    creep.memory.status = "empty";
                    return true;
                }
            // }
        }
        return false;
    }

    transporter.pickup = function(creep) {
        var target = creep.pos.findInRange(Game.DROPPED_ENERGY, 2, {filter: function(e){
            return e.energy >= creep.energyCapacity;
        }});

        if(target.length && creep.energy < creep.energyCapacity){
            creep.moveTo(target[0]);
            creep.memory.status = "empty";
            if(creep.pos.isNearTo(target[0])){
                creep.pickup(target[0]);
                creep.memory.target = null;
            }
            return true;
        }
        return false;
    }

    transporter.charge_ext = function(creep) {
        var e = _.filter(creep.room.find(Game.MY_STRUCTURES), function(s){
            return s.structureType == Game.STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
        })
        if(e.length && creep.energy){
            creep.memory.status = "in_ext";
            creep.moveTo(e[0]);
            creep.transferEnergy(e[0]);
            return true;
        }
        return false;
    }

    transporter.in_fear = function(creep) {
        var ne = creep.pos.findNearest(Game.HOSTILE_CREEPS);
        if(!!ne && creep.pos.inRangeTo(ne, settings.HEALER_RANGE)){
            creep.memory.status = "in_fear";
            retreat(creep, ne);
            return true;
        }
        return false;
    }

    transporter.to_empty = function(creep) {
        var et = creep.pos.findInRange(Game.MY_CREEPS, 2, {filter: function(c){
            return c.memory.role == "transporter" 
                && c.energyCapacity > c.energy
                && c.pos.findPathTo(Game.spawns.Spawn1).length - creep.pos.findPathTo(Game.spawns.Spawn1).length > 1;
        }})
        if(creep.energy == creep.energyCapacity && et.length){
            et = et[0];
            creep.transferEnergy(et, et.energyCapacity - et.energy);
            et.moveTo(Game.spawns.Spawn1);
            return false;
        }
        return false;
    }

    transporter.supply = function(creep) {
        var b = creep.pos.findInRange(Game.MY_CREEPS, 1, {filter: function(c){
            return c.memory.role == "builder" && c.memory.status == "building" && c.energy <= c.energyCapacity;
        }});
        b = _.sortBy(b, function(c){
            return 0 - c.memory.tier;
        })

        if(b.length > 0 && creep.energy > 1) {
            if(Memory.counts.suppliers < Memory.counts.builders + 1){
                creep.memory.status = "supply";
                creep.transferEnergy(b[0])
            }else{
                creep.memory.status = "empty";
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1)
            }
            return true;
        }
        return false;
    }

    transporter.charge_builder = function(creep) {
        var builder = creep.pos.findNearest(Game.MY_CREEPS, {filter: function(b){
            return b.memory.role == "builder" && b.energyCapacity - b.energy > 1 && b.memory.status == "building";
        }})
        if(!!builder && Memory.counts.miners >= Memory.sources.count){
            creep.memory.status = "to_builder";
            creep.moveTo(builder);
            creep.transferEnergy(builder);
            return true;
        }
        return false;
    }

    transporter.charge_spawn = function(creep) {
        if(creep.energy == creep.energyCapacity){
            creep.memory.status = "full";
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1)
            return true;
        }
        return false;
    }

    return transporter;
}