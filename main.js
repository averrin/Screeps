var _ = require('lodash');
if(!_.size(Game.spawns)) return;

var harvester = require('harvester');
var guard = require('guard');
var healer = require('healer');
var settings = require('settings');

var Spawn1 = Game.spawns.Spawn1;
var initRoom = Game.getRoom("1-1");

Memory.counts = {}
Memory.counts.enemies = _.size(Game.getRoom("1-1").find(Game.HOSTILE_CREEPS));
Memory.counts.guards = _.size(_.filter(Game.creeps, {memory: {role: 'guard'}}));
Memory.counts.tier1 = _.size(_.filter(Game.creeps, {memory: {tier: 1}}));
Memory.counts.tier2 = _.size(_.filter(Game.creeps, {memory: {tier: 2}}));
Memory.counts.tier3 = _.size(_.filter(Game.creeps, {memory: {tier: 3}}));
Memory.counts.healers = _.size(_.filter(Game.creeps, {memory: {role: 'healer'}}));
Memory.counts.harvesters = _.size(_.filter(Game.creeps, {memory: {role: 'harvester'}}));
Memory.counts.miners = _.size(_.filter(Game.creeps, {memory: {role: 'miner'}}));
Memory.counts.builders = _.size(_.filter(Game.creeps, {memory: {role: 'builder'}}));
Memory.counts.suppliers = _.size(_.filter(Game.creeps, {memory: {role: 'transporter', status: "supply"}}));
Memory.counts.transporters = _.size(_.filter(Game.creeps, {memory: {role: 'transporter'}}));
Memory.counts.range_guards = _.size(_.filter(Game.creeps, {memory: {role: 'guard', "tier": 1, "type": "range"}}));
Memory.counts.dying_harvesters = _.size(_.filter(Game.creeps, function(c){return c.memory.role == 'harvester' && c.ticksToLive < 50;}));
Memory.counts.dying_creeps = _.size(_.filter(Game.creeps, function(c){return _.contains(['miner', 'transporter'], c.memory.role) && c.ticksToLive < 50;}));

Memory.exit = 0;

var tier = _.filter(initRoom.find(Game.MY_STRUCTURES), function(s){
    return s.structureType == Game.STRUCTURE_EXTENSION && s.energy == s.energyCapacity;
})
if(!!tier){
    tier = tier.length + 1;
}else{
    tier = 1;
}
Memory.tier = tier;
    
Memory.at_war = !!Memory.counts.enemies
var cs = initRoom.find(Game.CONSTRUCTION_SITES, { filter: function(c){return c.progress > 0}})
Memory.building_time = (settings.MODE == "survival" && tier == 1 && (Spawn1.energy >= Game.CONSTRUCTION_COST["extension"] || !!cs)) || (settings.MODE == "tech")
if(Memory.building_time && !cs.length) Memory.building_time = false;

if(_.size(Game.spawns) && !Memory.inited){
    require("init")();
    require('init_' + settings.MODE)();
    Memory.inited = true;
}
require('buildorder')(tier);

// if(!(Game.time % 100)){

//     var exits_d = [Game.EXIT_TOP, Game.EXIT_LEFT, Game.EXIT_BOTTOM, Game.EXIT_RIGHT];
//     var exits = [];
//     var d;
//     _.forEach(exits_d, function(d){
//         d = initRoom.find(d);
//         if(d.length){
//             exits.push(d[2])
//         }
//     })
    
//     var x = exits[Memory.exit].pos.x;
//     if(x == 0) x = x + 10;
//     if(x == 49) x = x - 10;
//     var y = exits[Memory.exit].pos.y;
//     if(y == 0) y = y + 10;
//     if(y == 49) y = y - 10;
//     Memory.flag.x = x;
//     Memory.flag.y = y;
//     Memory.exit = Memory.exit + 1
//     if(Memory.exit == exits.length){
//         // Memory.exit = 0;
//     }
// }

for(var name in Game.creeps) {
    require(Game.creeps[name].memory.role)(Game.creeps[name])
}

// console.log("Version:", "2.1")