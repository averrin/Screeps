var settings = require('settings');
var _ = require('lodash');

module.exports = function (creep) {

    var target;
    var nh = Game.spawns.Spawn1.pos.findInRange(Game.HOSTILE_CREEPS, settings.MAGIC.SPAWN_HOSTILE_RANGE);
    if(_.size(nh)){
        target = Game.spawns.Spawn1.pos.findNearest(Game.HOSTILE_CREEPS);
    }
    
    target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
        filter: function(object) {
            return object.getActiveBodyparts(Game.HEAL) > 0 && object.getActiveBodyparts(Game.MOVE) > 0;
        }
    });
    if(!target){
        target = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(Game.ATTACK) > 0 && object.getActiveBodyparts(Game.MOVE) > 0;
            }
        });
    }
    if(!target){
        target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    }

    return target;
};