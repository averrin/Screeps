module.exports = function (creep) {
    var _ = require('lodash');
    var settings = require('settings');
    var retreat = require('retreat');

    var wh = creep.getActiveBodyparts(Game.WORK) > 0;
    var cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES, { filter: function(c){return c.progress > 0}});
    if(!cs) cs = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
    if(!cs){
        creep.memory.status = "relax"
        creep.moveTo(Memory.flag.x, Memory.flag.y);
        return;
    }
    
    if(!creep.pos.isNearTo(cs)) creep.moveTo(cs);
    creep.build(cs);
    creep.memory.status = "building"
    return
}